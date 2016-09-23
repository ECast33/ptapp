(function () {

    'use strict';
    var controllerId = 'registerController';

    angular.module('app').controller( controllerId , registerController );

    registerController.$inject = [ '$http', '$scope' , '$rootScope' , '$location', 'common_user' ];

    function registerController( $http, $scope , $rootScope , $location, common_user )
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


                // TODO: use Service
            common_user.write( $scope.user ).then(

                    function( data )
                    {
                        var result = data;

                        $rootScope.authenticated = true;
                        $rootScope.current_user = data.userName;
                        $location.path('/');

                    });

        };

    }

})();
