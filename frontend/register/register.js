app.controller('registerController', function  ( $scope, $http, $rootScope, $location )
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
            //$scope.user.write = 1;
            $http.post('api/auth', $scope.user ).success(

                function( data )
                {
                    $rootScope.authenticated = true;
                    $rootScope.current_user = data.userName;
                    $location.path('/');

                });
        }

    };
});
