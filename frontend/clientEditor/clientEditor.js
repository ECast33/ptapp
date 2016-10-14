( function ( ) {

    var controllerId = 'clientEditor';

    angular.module('app').controller( controllerId , clientEditor );

    clientEditor.$inject = [ '$rootScope' , '$location', 'common_client'];

    function clientEditor( $rootScope, $location, common_client )
    {
        var vm = this;

        vm.currentClient = $rootScope.currentClient;

      vm.clientCancel = function (  )
      {
          console.log('button Clicked');
          $location.path('/');
      };

      vm.clientSave = function ( )
      {

          //TODO Implement the save

      };

    }

})();