var mysql      = require('mysql');

module.exports = function ( pool)
{

    var database =
    {
        host                : "192.168.0.20",
        port                : 3306,
        user                : 'fantasyApp',
        password            : '1234QWER',
        database            : 'playerSpecial',
        multipleStatements  : true

    };
    
    var pool = mysql.createPool(
        {
            host                : "192.168.0.20",
            port                : 3306,
            user                : 'fantasyApp',
            password            : '1234QWER',
            database            : 'playerSpecial'
        });

   
    
    var api =
    {
        db      : database,
        pool    : pool
    };

    return api


};
