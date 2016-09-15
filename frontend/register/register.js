(function () {

    'use strict';
    var controllerId = 'registerController';

    angular.module('app').controller( controllerId , registerController );

    registerController.$inject = [ '$http', '$scope' , '$rootScope' , '$location', 'common_client' ];

    function registerController( $http, $scope , $rootScope , $location, common_client )
    {

        $scope.user =
        {
            userName: '',
            password: '',
            userId  : -1
        };

        $scope.error_message = '';


        $scope.register = function ( )
        {

            if( '' === $scope.user.userName && '' === $scope.user.password )
            {
                $scope.user.write = 0;
                $scope.error_message = 'please the required information';
                $location.path('/register');
            }
            else
            {
                // TODO: use Service
                $scope.user.write = 1;
                $http.post('api/auth', $scope.user ).success(

                    function( data )
                    {
                        $rootScope.authenticated = true;
                        $rootScope.current_user = data.userName;
                        $location.path('/');

                    });
            }

        };

    }

})();
