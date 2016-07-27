app.controller('dashController', function  ( $scope, $rootScope, $location )
{

        $scope.user = $rootScope.current_user;
        $location.path('/dashboard');

});