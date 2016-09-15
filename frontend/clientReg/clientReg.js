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

        }else if( true == $rootScope.authenticated)
        {
            $scope.user = $rootScope.current_user;
            $location.path('/clientReg' );
        }else
        {
            $location.path('/');
        }

        $scope.client = {

            name: '',
            email: '',
            phone: '',
            age:   0,
            height: '',
            weight: 0

        };

        $scope.regClient = function (  )
        {
            common_client.write( $scope.client ).then(

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
                        $location.path('/');

                    }

                }
            )
        }

    }

})();