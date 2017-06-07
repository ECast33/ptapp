(function(){
    'use strict';
    
    angular
        .module('app.header')
        .directive('header', header);
        
        header.$inject = ['$state'];
        
        function header(){
        // Usage:
        //      <header></header>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: 'app/header/header.html',
            controller: controller
        };
        return directive;
        
            function link( scope, element, attrs){
                
            }
            
            function controller($scope, $state){
                
                $scope.goHome = function(){
                    $state.go('home')
                }
                
                            
                $scope.login = function(){
                    console.log('click');
                    $state.go("login");
                 }
            }
        
        }
})();