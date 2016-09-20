app.controller('mainController', function  ( $scope, $rootScope, $location )
{

    if( false === $rootScope.authenticated  )
    {
        $location.path('/');

    }else if(true === $rootScope.authenticated )
    {
        $scope.user = $rootScope.current_user;
        $location.path('/dashboard' );
    }
    else
    {
        $location.path('/');
    }

    $scope.scrollTo = function ( id )
    {
        $location.hash(id);
        $anchorScroll();

    }

});