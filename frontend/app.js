var app = angular.module('app', ['ngRoute', 'ngResource']).run( function ( $rootScope, $location, $anchorScroll) {

    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $rootScope.currentClient = {};


    
});

app.config(
    function( $routeProvider )
    {
        $routeProvider
        //the main display
            .when('/', {
                templateUrl: '/main/main.html'
                //controller: 'mainController'
            })
            //the login display
            .when('/login', {
                templateUrl: '/login/login.html'
                //controller: 'logInController'
            })            //the login display
            .when('/logout', {
                templateUrl: '/login/login.html',
                controller: 'logoutController'
            })
            //the logout display
            .when('/clientReg', {
                templateUrl: 'clientReg/clientReg.html'
                //controller: 'authController'
            })
            .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.html'
            })
            .when('/clientEditor', {
                templateUrl: 'clientEditor/clientEditor.html'
            })
            //the signup display
            .when('/register', {
                templateUrl: 'register/register.html'
                //controller: 'registerController'
            });
    });

app.controller('logoutController', function ($scope, $rootScope, $location)
{
    if( false === $rootScope.authenticated  )
    {
        $location.path('/');

    }else if(true === $rootScope.authenticated )
    {
        $rootScope.current_user = '';
        $rootScope.authenticated = false;
        $location.path('/' );
    }

    $scope.scrollTo = function ( id )
    {
        $location.hash(id);
        $anchorScroll();

    }

});