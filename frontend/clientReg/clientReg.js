( function ()
{
    'use strict';
    var controllerId = 'clientRegController';

    angular.module('app').controller( controllerId , clientRegController );

    clientRegController.$inject = [  '$scope' , '$rootScope' , '$location', 'common_client' ];

    function clientRegController( $scope , $rootScope , $location, common_client )
    {

        if( false === $rootScope.authenticated  )
        {
            $location.path('/');

        }else if( true == $rootScope.authenticated )
        {
            $scope.user = $rootScope.current_user;
            $location.path('/clientReg' );
        }else
        {
            $location.path('/');
        }


        var currentClient = {

            name: '',
            email: '',
            phone: '',
            age:   0,
            height: '',
            weight: 0

        };




        $scope.regClient = function (  )
        {
            currentClient =  $scope.client;

            common_client.write( currentClient ).then(

                function ( data )
                {

                    if( 0 === data.length )
                    {
                        $scope.error_message = 'Please fill Out form';
                        $location.path('/dashboard');

                    }
                    else
                    {
                        $scope.client = data;
                        $location.path('/dashboard');

                    }

                }, function ( err )
                {
                    console.log( err );
                }
            );
        }



    }

})();