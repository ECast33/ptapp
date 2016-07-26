/*jslint node: true */
'use strict';

var chalk       = require('chalk'),
    _           = require('lodash'),
    mysql       = require('mysql'),
    fs          = require('fs'),
    path        = require('path'),
    md5         = require('md5'),
    Promise     = require('bluebird');

module.exports = function( options )
{
    var SCRIPT_START            = '-- @ ';

    // to write the install script all pretty with columns
    var longestPath             = 0;

    var executeCount            = 0;

    var pool  = mysql.createPool (
        {
            connectionLimit     : 20,
            host                : options.host,
            port                : options.port,
            user                : options.user,
            password            : options.password,
            database            : options.database
        } );

    function getLongestPath()
    {
        var longestPath = 0;

        _.forEach( fs.readdirSync( options.schemaLocation ), function ( script )
        {
            if ( script.length > longestPath )
            {
                longestPath = script.length;
            }
        } );

        _.forEach( fs.readdirSync( options.routinesLocation ), function ( script )
        {
            if ( script.length > longestPath )
            {
                longestPath = script.length;
            }
        } );

        _.forEach( fs.readdirSync( options.indexLocation ), function ( script )
        {
            if ( script.length > longestPath )
            {
                longestPath = script.length;
            }
        } );

        // round up to the nearest 10
        longestPath = Math.ceil( longestPath/ 10 ) * 10;

        return longestPath;
    }

    function getConnection ( sLabel, done )
    {
        return new Promise( function ( resolve, reject )
        {
            getPool().getConnection( function( err, conn )
            {
                if ( err )
                {
                    if ( sLabel )
                    {
                        console.log( chalk.red('!! ' + sLabel + ' : ERROR') );
                    }

                    if ( err && err.code )
                    {
                        console.log( chalk.red('!! ' + 'Code' + ' : ' + err.code ) );
                    }

                    if ( err && err.message )
                    {
                        console.log( chalk.red('!! ' + 'Code' + ' : ' + err.message ) );
                    }

                    done ( err );
                }

                if ( conn )
                {
                    resolve ( conn );
                }

            } );

        } );
    }

    function executeWithPromised( conn, statementObj, done )
    {
        return new Promise( function ( resolve, reject )
        {
            executeCount++;

            conn.query( statementObj.stmt, function ( err, rows )
            {
                conn.release();

                if ( err )
                {

                    if ( statementObj.file_path )
                    {
                        console.log( chalk.red('!! ' + 'File    : ' + statementObj.file_path ) );
                    }

                    if ( statementObj.stmt_idx )
                    {
                        console.log( chalk.red('!! ' + 'StmtIdx : ' + statementObj.stmt_idx ) );
                    }

                    if ( statementObj.file_label )
                    {
                        console.log( chalk.red('!! ' + 'Label   : ' + statementObj.file_label ) );
                    }

                    if ( err && err.code )
                    {
                        console.log( chalk.red('!! ' + 'Code    : ' + err.code ) );
                    }

                    if ( err && err.message )
                    {
                        console.log( chalk.red('!! ' + 'Message : ' + err.message ) );
                    }

                    // trace everything
                    console.log( chalk.red('!! ' + '********** ********** ********** ********** ********** **********' ) );
                    console.log( chalk.red( '' ) );
                    console.log( chalk.red( statementObj.stmt ) );
                    console.log( chalk.red( '' ) );
                    console.log( chalk.red('!! ' + '********** ********** ********** ********** ********** **********' ) );

                    done ( err );
                }

                if ( rows )
                {
                    resolve ( rows );
                }

            } );

        } );
    }

    function executeAsPromised( statementObj, done )
    {
        return new Promise( function ( resolve, reject )
        {
            getConnection ( statementObj.file_label, done ).then (

                function ( value )
                {
                    var conn = value;

                    executeWithPromised ( conn, statementObj, done ).then (

                        function ( value )
                        {
                            resolve( value );

                        }

                    );

                }

            );

        } );

    }

    var STR_PAD_LEFT    = 1;
    var STR_PAD_RIGHT   = 2;

    function padString ( str, len, pad, dir )
    {
        if ( len + 1 >= str.length )
        {
            switch (dir)
            {
                case STR_PAD_LEFT:

                    str = new Array(len + 1 - str.length).join(pad) + str;

                    break;

                default:    // STR_PAD_RIGHT

                    str = str + new Array(len + 1 - str.length).join(pad);

                    break;
            }

        }

        return str;

    }

    // writes | overwrites the master install script
    function writeInstallScript()
    {
        fs.writeFileSync ( options.installScript, '# Master install file' + '\r\n' );
        fs.appendFileSync( options.installScript, '# ' + '\r\n' );
        fs.appendFileSync( options.installScript, '# ' + '\r\n' );
        fs.appendFileSync( options.installScript, ''   + '\r\n' );
    }

    function appendInstallScripts()
    {
        longestPath = getLongestPath();

        _.forEach( fs.readdirSync( options.schemaLocation ), function ( script )
        {
            // whack the nnn_ off the front of the filename
            var sFilenameNoVer  = script.substring( 4 );

            // whack the extension off the end of the filename
            var sFilenameNoExt  = sFilenameNoVer.substring( 0, sFilenameNoVer.length -4 );

            // build the script line. simple filename + delim + root + filename
            var sInstall = padString ( sFilenameNoExt, longestPath, ' ', STR_PAD_RIGHT ) + SCRIPT_START + '../schemaScripts/' + script + '\r\n';

            // append to the script line to the install script file
            fs.appendFileSync( options.installScript, '  ' + sInstall );

        } );

        fs.appendFileSync( options.installScript, ''   + '\r\n' );
        fs.appendFileSync( options.installScript, ''   + '\r\n' );

        _.forEach( fs.readdirSync( options.indexLocation ), function ( script )
        {
            // whack the nnn_ off the front of the filename
            var sFilenameNoVer  = script.substring( 4 );

            // whack the extension off the end of the filename
            var sFilenameNoExt  = sFilenameNoVer.substring( 0, sFilenameNoVer.length -4 );

            // build the script line. simple filename + delim + root + filename
            var sInstall = padString ( sFilenameNoExt, longestPath, ' ', STR_PAD_RIGHT ) + SCRIPT_START + './indexScripts/' + script + '\r\n';

            // append to the script line to the install script file
            fs.appendFileSync( options.installScript, '  ' + sInstall );

        } );

        fs.appendFileSync( options.installScript, ''   + '\r\n' );
        fs.appendFileSync( options.installScript, ''   + '\r\n' );

        _.forEach( fs.readdirSync( options.routinesLocation ), function ( script )
        {
            // whack the extension off the end of the filename
            var sFilenameNoExt  = script.substring( 0, script.length -4 );

            // build the script line. simple filename + delim + root + filename
            var sInstall = padString ( sFilenameNoExt, longestPath, ' ', STR_PAD_RIGHT ) + SCRIPT_START + '../routineScripts/' + script + '\r\n';

            // append to the script line to the install script file
            fs.appendFileSync( options.installScript, '  ' + sInstall );

        } );
    }

    function splitFileIntoLines( file_path )
    {
        var fileContent = fs.readFileSync( file_path, 'utf8' );

        var trimmedContent = fileContent.trim();

        // split on rn nr n r
        var re = /\r\n|\n\r|\n|\r/g;

        var retVal = trimmedContent.replace(re,"\n").split("\n");

        return retVal;
    }

    function splitFileIntoStatements( script_file )
    {
        var listOfStmt  = [];
        var buffer      = '';

        _.forEach( splitFileIntoLines ( script_file ), function ( sLine )
        {
            var trimmedLine = buffer + sLine.trim();

            if ( 0 === trimmedLine.length )
            {
                listOfStmt.push ( '' );
                return;

            } else if ( '-- GO;' === sLine || '-- GO' === sLine || '--GO;' === sLine || '--GO' === sLine )
            {
                if ( 0 < buffer.length )
                {
                    listOfStmt.push ( buffer );
                    buffer = '';
                }

            } else
            {
                buffer += sLine + '\r\n';
            }

        } );

        if ( 0 < buffer.length )
        {
            listOfStmt.push ( buffer );
        }

        return listOfStmt;
    }

    function getPool()
    {
        return pool;
    }

    function buildInstallScript( done )
    {
        writeInstallScript();

        appendInstallScripts();

        done();
    }

    // install the scripts from the script file
    function installBuildScript( done )
    {
        var dir_db_scripts = path.join( __dirname, '../databaseScripts' );

        var fileLines = splitFileIntoLines ( options.installScript );

        var listOfStmt = [];

        _.forEach( fileLines, function ( script )
        {
            if ( 0 === script.length ) return;

            if ( _.startsWith( script, '#' ) ) return;

            if ( _.startsWith( script, ';' ) ) return;

            var scriptLabel    = script.substring( 0, script.indexOf( SCRIPT_START ) );

            scriptLabel = scriptLabel.trim();

            var scriptFragment = script.substring( script.indexOf( SCRIPT_START ) + _.size( SCRIPT_START ) );

            var script_file = path.join( dir_db_scripts, scriptFragment );

            var script_file_md5 = md5 ( script_file );

            var nStmtIdx = 0;

            _.forEach( splitFileIntoStatements( script_file ), function ( stmt )
            {
                var trimmed_stmt = stmt.trim();

                if ( 0 === trimmed_stmt.length ) return;

                var statementObj =
                {
                    file_path   : script_file,
                    file_label  : scriptLabel,
                    file_md5    : script_file_md5,
                    stmt        : stmt,
                    stmt_idx    : nStmtIdx
                };

                listOfStmt.push ( statementObj );

                nStmtIdx++;
            } );

        } );

        function executeOneStmt ( statementObj, done )
        {
            return executeAsPromised ( statementObj , done ).then (

                function ( value )
                {
                    if ( 0 < listOfStmt.length )
                    {
                        var statementObj = listOfStmt.shift();

                        return executeOneStmt( statementObj, done );

                    }/* else
                    {
                        done();
                    }*/

                }

            );
        }

        if ( 0 < listOfStmt.length )
        {
            var statementObj = listOfStmt.shift();

            executeOneStmt( statementObj, done );

        } else
        {
            done();
        }
    }

    var service =
    {
        buildInstallScript  : buildInstallScript,
        installBuildScript  : installBuildScript
    };

    return service;

};