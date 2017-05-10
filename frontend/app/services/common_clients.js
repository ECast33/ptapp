(function () {

    'use strict';

    var serviceId = 'common_client';

    angular.module('app').factory( serviceId , common_client );

    common_client.$inject = ['$http', '$q' ];

   function common_client( $http , $q )
   {

       function readAll( client )
       {
           var defer = $q.defer();

           client.readAll = 1;

            $http.post('api/clients', client).success(

               function ( result )
               {
                   defer.resolve( result );
               }
            ).error(

               function ( err, status)
               {
                    defer.reject( err );
               }
            );

            return defer.promise;
       }

       function write( client )
       {
           var defer = $q.defer();

            client.write = 1;

           $http.post('api/clients', client).success(

               function ( result )
               {
                   defer.resolve( result );
               }
           ).error(

               function ( err, status)
               {
                   defer.reject( err );
               }
           );

           return defer.promise;
       }

       function read( client )
       {
           var defer = $q.defer();

           client.read = 1;

           $http.post('api/clients', client).success(

               function ( result )
               {
                   defer.resolve( result );
               }
           ).error(

               function ( err, status)
               {
                   defer.reject( err );
               }
           );

           return defer.promise;
       }

       function update( client )
       {
           var defer = $q.defer();

           client.update = 1;

           $http.post('api/clients', client).success(

               function ( result )
               {
                   defer.resolve( result );
               }
           ).error(

               function ( err, status)
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