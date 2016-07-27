app.controller('mainController', function  ( $scope, $rootScope, $location )
{

    if( false === $rootScope.authenticated  )
    {
        $location.path('/' );

    }else
    {
        $scope.user = $rootScope.current_user;
        $location.path('/dashboard' || '/');
    }

});