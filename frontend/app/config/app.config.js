(function () {
    'use strict';
    //TODDO IMPL state provvider
    angular.module('app')
        .config([ '$locationProvider', '$stateProvider', '$urlRouterProvider', function ( $locationProvider, $stateProvider, $urlRouterProvider ) {
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state("login", {
                    url: "/login",
                    views:{
                        "header": { template: "<header></header>" },
                        "content": {templateUrl:"app/login/login.html", controller: "logInController"}
                    }
                }).state("home", {
                    url: "/home",
                    views:{
                        "header": { template: "<header></header>" },
                        "content": {templateUrl:"app/home/home.html", controller: "homeController"}
                    }
                });;
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            });
        }])
        .run(runApp);

    runApp.$inject = ['$rootScope', '$state'];

        function runApp($rootScope, $state) {

        }
})();