( function () {

    var controllerId = 'clientEditor';

    angular.module('app').controller( controllerId , clientEditor );

    clientEditor.$inject = [ '$http' , '$scope' , '$rootScope' , '$location' ];

    function clientEditor( $http, $scope, $rootScope, $location )
    {

        var vm = this;

        if( false === $rootScope.authenticated  )
        {
            $location.path('/');

        }else if( true === $rootScope.authenticated )
        {
            $scope.user = $rootScope.current_user;

            $location.path('/clientEditor' );
        }

        //var quedClient = $scope.client.pop();

        //var client1 = $scope.client.pop();

        $scope.client = {};
        $scope.clients = [];
        $scope.clients.readAll = 1;

        getClient( $scope.client );

        function getClient( obj )
        {
            $http.post('api/clients', obj ).success(

                function( data )
                {


                    $scope.client = data ;

                });
        }

    }

})();