var mysql      = require('mysql'),
    db         = require('./database')();


module.exports = function (  )
{
    function returnAll( value )
    {
        if ( 0 < value.length )
        {
            return  value[0];

        } else
        {
            return  value;
        }
    }

    function executeSql( sp_script )
    {
        return new Promise ( function ( resolve, reject )
        {
            
            db.pool.getConnection( function ( err , connection)
            {
                if( err )
                {
                    console.log( 'No connection ' + err );
                }
                else
                {
                    connection.query( sp_script, function ( err, rows, fields )
                    {
                        if ( err )
                        {
                            connection.release();

                            reject ( err );
                        }

                        connection.release();

                        resolve ( returnAll( rows ) );

                    } );
                }

            } );
        } );
    }

    var service =
    {
        executeSql      : executeSql
    };

    return service;


};