(function () {

    'use strict';
    var controllerId = 'logInController';

    angular
        .module('app')
        .controller( controllerId , logInController );

    logInController.$inject = [ '$scope' , '$rootScope' , '$location'];

    function logInController( $scope , $rootScope , $location )
    {

       $scope.login = function(){
           console.log('logged in');
           $location.path('/home');
       }
    }

})();

