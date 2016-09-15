(function () {

    'use strict';

    var serviceId = common_client;

    angular.module('app').factory( 'common_client' , common_client );

    common_client.$inject = ['$http'];

   function common_client( $http)
   {

       function readAll( obj )
       {
           var clients = [];
           obj.readAll = 1;

           return $http.post('api/clients', obj ).then(

               function( result )
               {
                   clients = result.data;
                   return clients;
               });
       }

       function write( obj )
       {

           var client = obj;
           obj.write = 1;

           return $http.post('api/clients', obj ).then(

               function( result )
               {
                   client = result.data;
                   return client;
               });

       }

       function read( obj )
       {

           var client = obj;
           obj.read = 1;

           return $http.post('api/clients', obj ).then(

               function( result )
               {
                   client = result.data;
                   return client;
               });

       }

       function update( obj )
       {

           var client = obj;
           obj.update = 1;

           return $http.post('api/clients', obj ).then(

               function( result )
               {
                   client = result.data;
                   return client;
               });

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