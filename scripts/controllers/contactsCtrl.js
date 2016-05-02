app.controller('contactsCtrl', ['$scope','$rootScope','$location','authFactory', function($scope, $rootScope,$location,authFactory){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }
}]);