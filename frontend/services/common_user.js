(function () {
    'use strict';

    var serviceId = 'common_user';

    angular.module('app').factory( serviceId , common_user );

    common_user.$inject = ['$http', '$q'];
    
    function common_user( $http, $q )
    {
        
        function write( user )
        {
            var defer = $q.defer();

            user.write =1;

            $http.post( 'api/auth', user ).success(

                function ( result )
                {
                    defer.resolve( result );
                }
            ).error(

                function ( err , status )
                {
                    defer.reject( err );
                }
            );

            return defer.promise;
        }

        function read( user )
        {
            var defer = $q.defer();

            user.read =1;

            $http.post( 'api/auth', user ).success(

                function ( result )
                {
                    defer.resolve( result );
                }
            ).error(

                function ( err , status )
                {
                    defer.reject( err );
                }
            );

            return defer.promise;
        }

        function readAll( user )
        {
            var defer = $q.defer();

            user.readAll =1;

            $http.post( 'api/auth', user ).success(

                function ( result )
                {
                    defer.resolve( result );
                }
            ).error(

                function ( err , status )
                {
                    defer.reject( err );
                }
            );

            return defer.promise;
        }

        function update( user )
        {
            var defer = $q.defer();

            user.update =1;

            $http.post( 'api/auth', user ).success(

                function ( result )
                {
                    defer.resolve( result );
                }
            ).error(

                function ( err , status )
                {
                    defer.reject( err );
                }
            );

            return defer.promise;
        }

        var service =
        {
            readAll : readAll,
            write   : write,
            read    : read,
            update  : update

        };

        return service;
    }
})();