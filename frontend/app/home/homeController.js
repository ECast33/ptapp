(function (){
    'use strict'
    
    angular
        .module('app')
        .controller('homeController', homeController);
        
        homeController.inject = ['$scope', '$state'];
        
        function homeController($scope, $state) {
            
            $scope.login = function(){
                console.log('click');
                $state.go("login");
            }
        }
})();