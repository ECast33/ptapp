app.controller('logInController', function  ( $http, $scope, $rootScope, $location )
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
});
