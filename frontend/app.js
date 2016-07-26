var app = angular.module('app', ['ngRoute', 'ngResource']).run( function ( $rootScope ) {

    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    
});

app.config(
    function( $routeProvider )
    {
        $routeProvider
        //the main display
            .when('/', {
                templateUrl: '/main/main.html',
                controller: 'mainController'
            })
            //the login display
            .when('/login', {
                templateUrl: '/login/login.html',
                controller: 'logInController'
            })
            //the logout display
            .when('/logout', {
                templateUrl: 'login.html',
                controller: 'authController'
            })
            //the signup display
            .when('/register', {
                templateUrl: 'register/register.html',
                controller: 'registerController'
            });
    });


// app.controller('mainController', function  ( $scope, $rootScope, $location )
// {
//     $scope.user = $rootScope.current_user;
//    $location.path('/main');
//
// });

