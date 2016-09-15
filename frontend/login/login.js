(function () {

    'use strict';
    var controllerId = 'logInController';

    angular.module('app').controller( controllerId , logInController );

    logInController.$inject = [ '$http' ,'$scope' , '$rootScope' , '$location', 'common_client' ];

    function logInController( $http, $scope , $rootScope , $location, common_client )
    {

        $scope.user =
        {
            userName: '',
            password: '',
            userId  : -1
        };

        $scope.error_message = '';

        $scope.login = function ( )
        {
            //TODO: use service
            $scope.user.read = 1;
            $http.post('api/auth', $scope.user ).success(

                function( data )
                {
                    if( 0 === data.length )
                    {
                        $scope.error_message = 'Username and password not found';
                        $location.path('/register');

                    }
                    else
                    {
                        $rootScope.authenticated = true;
                        $rootScope.current_user = data[0].userName;
                        $location.path('/');
                    }


                });
        }

    }

})();

