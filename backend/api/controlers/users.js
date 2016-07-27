var _            = require('lodash'),
    mysql        = require('mysql'),
    mysqlServ    = require('../../config/mysqlServ')(),
    sprintf      = require('sprintf'),
    chalk        = require('chalk');

module.exports = function ( )  {

    function returnOne ( res, value )
    {
        if ( 0 < value.length && 0 < value[0].length )
        {
            return res.status( 200 ).json( value[0][0] );

        } else
        {
            console.log( chalk.red('!! ' + ' : NO DATA ERROR') );

            return res.status( 401 ).send( {
                success: false,
                message: "No Data"
            } );
        }
    }

    function readImpl( req, res, next )
    {
        var sp_script = sprintf( "CALL %s( %s, %s, %s );",
            'sp_User_BuilderOne',

            mysql.escape( req.body.userName ),
            mysql.escape( req.body.password ),
            mysql.escape( req.body.userId)
        );

        mysqlServ.executeSql( sp_script ).then (

            function ( value )
            {

               return res.json( value );

            }
        );
    }

    function writeImpl( req, res, next )
    {
        var sp_script = sprintf( "CALL %s( %s, %s );",
            'sp_User_Create',
            mysql.escape( req.body.userName ),
            mysql.escape( req.body.password )
        );

        mysqlServ.executeSql( sp_script ).then (

            function ( value )
            {

              return  res.json( value );

            }
        );
    }


    function readAllImpl( req, res, next  )
    {
        var sp_script = sprintf( "CALL %s( );",
            'sp_User_BuilderAll'

        );

        mysqlServ.executeSql( sp_script ).then (

            function ( value )
            {

              return res.json( value );

            }
        );
    }


    // function post( req, res, next)
    // {
    //
    //     return new Promise ( function ( resolve, reject )
    //     {
    //         if ( undefined === req.body )
    //             {
    //                 reject( req );
    //                 console.log( chalk.red('!! Attempting post : ERROR - missing body' ));
    //
    //                 return res.status( 401 ).send( {
    //                     success: false,
    //                     message: "Invalid parameter"
    //                 } );
    //
    //             } else if( 1 == req.body.readAll )
    //             {
    //                return resolve( readAllImpl (req, res, next) );
    //
    //             } else if( 1 == req.body.write )
    //             {
    //                 return resolve ( writeImpl(req, res, next) );
    //
    //             }else if( 1 == req.body.read )
    //             {
    //                 return resolve ( readImpl( req, res, next ));
    //
    //             }else
    //             {
    //                 reject( req );
    //                 return res.status( 401 ).send( {
    //                     success: false,
    //                     message: "Invalid parameter"
    //                 } );
    //
    //             }
    //
    //     });
    //
    // }
    
    
    function post( req, res, next)
    {
        if ( undefined === req.body )
        {
            console.log( chalk.red('!! Attempting post : ERROR - missing body' ));

            return res.status( 401 ).send( {
                success: false,
                message: "Invalid parameter"
            } );

        } else if( 1 == req.body.readAll )
        {
            return readAllImpl (req, res, next);

        } else if( 1 == req.body.write )
        {
            return writeImpl(req, res, next);

        }else if( 1 == req.body.read )
        {
            return readImpl( req, res, next );

        }else
        {
            return res.status( 401 ).send( {
                success: false,
                message: "Invalid parameter"
            } );

        }

    }

    var api =
    {
        post : post
    };

    return api;
};