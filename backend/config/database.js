var mysql      = require('mysql');

module.exports = function ( pool)
{

    var database =
    {
        host                : "localhost",
        port                : 3306,
        user                : 'mobius1333',
        password            : '1234QWER',
        database            : 'ptApp',
        multipleStatements  : true

    };
    
    var pool = mysql.createPool(
        {
            host                : "localhost",
            port                : 3306,
            user                : 'mobius1333',
            password            : '1234QWER',
            database            : 'ptApp'
        });

   
    
    var api =
    {
        db      : database,
        pool    : pool
    };

    return api


};
