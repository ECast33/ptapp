( function ( ) {

    'use strict'
    var controllerId = 'dashController';

    angular.module('app').controller( 'dashController' , dashController );

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

        $scope.clients =  [];
        $scope.client = {};

        common_client.readAll( $scope.client );

    }

})();