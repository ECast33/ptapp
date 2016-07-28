app.controller('dashController', function  ( $http ,$scope, $rootScope, $location )
{



    if( false === $rootScope.authenticated  )
    {
        $location.path('/');

    }else if( true === $rootScope.authenticated )
    {
        $scope.user = $rootScope.current_user;
        $location.path('/dashboard' );
    }




    $scope.clients =  [];
    $scope.client =  {};
    $scope.client.readAll = 1;

    var clients = getClients( $scope.client);

    function getClients( obj )
    {
        $http.post('api/clients', obj ).success(

            function( data )
            {

                   $scope.clients = data ;

            });
    }

});