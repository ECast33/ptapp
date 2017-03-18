var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    users = require('../../api/controlers/users')();
// var bcrypt = require('bcrypt');


module.exports = function (  ) 
{  
    
    function findUser( req, res, next )
    {

        return users.post( req, res, next );
    }

    function createUser( req, res, next)
    {
        return users.post( req, res, next );

        // TODO: Hash Password
        // TODO: Compare password

        // bcrypt.genSalt(10, function(err, salt )
        // {
        //     bcrypt.hash(  req.body.password,  salt, function ( err, hash )
        //     {
        //
        //         req.body.password = hash;
        //
        //         var user = req.body;
        //
        //
        //
        //     });
        //
        // });

    }

    passport.use( new LocalStrategy
    (

        function authenticate( username, password, done )
        {
            // DB CALL

        }
    ));

    passport.serializeUser( function( user, done )
    {

        done( null, user.id);

    });

    passport.deserializeUser(
        function( id, done )
        {
            findUser( id, function(err, user) {
                done(err, user);
            });
        }
    );

    function post( req, res, next )
    {
        if( undefined === req.body )
        {
            console.log( chalk.red('!! Attempting post : ERROR - missing body' ));

            return res.status( 401 ).send({
                success: false,
                message: "Invalid parameter"
            } );
        }else if( 1 === req.body.read )
        {
          return findUser( req, res, next );
            
        }
        else if( 1 === req.body.write )
        {
          return createUser( req, res, next );

        }

    }

    var api =
    {
        post : post
    };

    return api;
};



