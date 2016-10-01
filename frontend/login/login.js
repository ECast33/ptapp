(function () {

    'use strict';
    var controllerId = 'logInController';

    angular.module('app').controller( controllerId , logInController );

    logInController.$inject = [ '$scope' , '$rootScope' , '$location', 'common_user' ];

    function logInController( $scope , $rootScope , $location, common_user )
    {

        $rootScope.authenticated = false;
        $scope.user =
        {
            userName: '',
            password: '',
            userId  : -1
        };

        $scope.error_message = '';

        $scope.login = function ( )
        {

           common_user.read( $scope.user).then(

                function( data )
                {
                    var result = data;

                    if( 0 !== result.length )
                    {
                        $rootScope.authenticated = true;
                        $rootScope.current_user = result[0].userName;
                        $location.path('/');
                    }else
                    {
                        $scope.error_message = 'Username and password not found';
                        $location.path('/register');

                    }

                }, function ( err )
                   {
                       console.log( err );
                   }
           );
        }

    }

})();

