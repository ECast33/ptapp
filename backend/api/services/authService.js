var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    users = require('../../api/controlers/users')();
var bcrypt = require('bcrypt');


module.exports = function (  ) 
{  
    
    function findUser( req, res, next )
    {
        req.body.read = 1;
       return users.post( req, res, next );
    }
    
    function createUser( newUser, done )
    {
        bcrypt.genSalt(10, function(err, salt )
        {
            bcrypt.hash( newUser.password,  salt, function ( err, hash )
            {

                newUser.password = hash;
                users.post( )

            });
        });
    }
    

    passport.use( new LocalStrategy
    (

        function authenticate( username, password, done )
        {
            // DB CALL
            
            
            // User.findOne({ username: username }, function (err, user) {
            //     if (err) { return done(err); }
            //     if (!user) {
            //         return done(null, false, { message: 'Incorrect username.' });
            //     }
            //     if (!user.validPassword(password)) {
            //         return done(null, false, { message: 'Incorrect password.' });
            //     }
            //     return done(null, user);
            // });
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
        }else
        {
            findUser( req, res, next );
            
        }
        
    }

    var api =
    {
        post : post
    };

    return api;
};



