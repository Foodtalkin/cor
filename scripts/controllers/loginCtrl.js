app.controller('loginCtrl', ['$scope', 'authFactory', '$location', function($scope, authFactory, $location){
  $scope.doLogin = function(){
    authFactory.doLogin($scope.username, $scope.password, function(response){
      if(response){
        $location.path('/appdashboard');
      }else{
        //Display generic error
        console.log("Le wild login error");
      }
    });
  }
}]);