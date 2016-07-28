app.controller('clientRegController', function  ( $scope, $rootScope, $location, $http )
{

    if( false === $rootScope.authenticated  )
    {
        $location.path('/');

    }else if( true == $rootScope.authenticated)
    {
        $scope.user = $rootScope.current_user;
        $location.path('/clientReg' );
    }else
    {
        $location.path('/');
    }


    $scope.client = {
        
        name: '',
        email: '',
        phone: '',
        age:   0,
        height: '',
        weight: 0
        
    };

    $scope.error_message = '';
    
    $scope.regClient = function (  ) 
    {
        $scope.client.write =1;

        $http.post('api/clients', $scope.client ).success(

            function( data )
            {
                if( 0 === data.length )
                {
                    $scope.error_message = 'Please fill Out form';
                    $location.path('/dashboard');

                }
                else
                {
                    $location.path('/');
                }


            });
        
        
    }
    
});