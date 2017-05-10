(function(){
    'use strict';
    
    angular
        .module('app.header')
        .directive('header', header);
        
        header.$inject = [];
        
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
            
            function controller($scope){
                
            }
        
        }
})();