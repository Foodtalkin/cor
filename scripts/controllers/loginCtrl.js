app.controller('loginCtrl', ['$scope','$rootScope', 'authFactory', '$location','$cookies',
 function($scope,$rootScope, authFactory, $location, $cookies){
  $scope.doLogin = function(){
    authFactory.doLogin($scope.username, $scope.password, function(response){
      if(response){
        $rootScope.username = $cookies.get("batuser");
        $rootScope.useremail = $cookies.get("batemail");
        $location.path('/privilege');
      }else{
        //Display generic error
        console.log("Le wild login error");
      }
    });
  }
}]);