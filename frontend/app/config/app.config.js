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
                        "content": {templateUrl:"app/login/login.html", controller: "logInController"}
                    }
                }).state("home", {
                    url: "/home",
                    views:{
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
            // $rootScope.$on('$stateChangeStart', function (event, next) {
            //   $state.go('login');
            // });
        }
})();