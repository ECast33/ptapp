app.controller('mainController', function  ( $scope, $rootScope, $location )
{
    if( false === $rootScope.authenticated  )
    {
        $location.path('/login');

    }else
    {
        $scope.user = $rootScope.current_user;
        $location.path('/');
    }

});