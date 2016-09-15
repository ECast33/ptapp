( function ( ) {

    'use strict';
    var controllerId = 'dashController';

    angular.module('app').controller( controllerId , dashController );

    dashController.$inject = [  '$scope' , '$rootScope' , '$location', 'common_client' ];

    function dashController(  $scope , $rootScope , $location, common_client )
    {

        if( false === $rootScope.authenticated  )
        {
            $location.path('/');

        }else if( true === $rootScope.authenticated )
        {
            $scope.user = $rootScope.current_user;
            $location.path('/dashboard' );
        }

        $scope.client = {};
        $scope.clients  = [];

        common_client.readAll( $scope.client ).then(

            function ( result )
            {
               $scope.clients = result;
            }
        );

    }

})();