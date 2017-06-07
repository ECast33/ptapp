(function () {
    'use strict';

    angular
        .module('app.carousel')
        .directive('homeCarousel', carousel);

    carousel.$inject = [ ];

    function carousel($location) {
        // Usage:
        //     <home-carousel></home-carousel>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'app/carousel/carousel.html',
            controller: controller
        };
        return directive;

        function link(scope, element, attrs) {

        }

        function controller($scope) {

            $('#myCarousel').carousel({
                interval: 15000
            });

        }
    }

})();