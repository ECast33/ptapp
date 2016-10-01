( function () {

    var controllerId = 'clientEditor';

    angular.module('app').controller( controllerId , clientEditor );

    clientEditor.$inject = [ '$http' , '$scope' , '$rootScope' , '$location' , 'common_client'];

    function clientEditor( $scope, $rootScope, $location, common_client )
    {
        $scope.currentClient = $rootScope.currentClient;

        var client = {};


      $scope.clientCancel = function (  )
      {
          $location.path('/dashboard');
         $scope.currentClient = null;

      }


    }

})();