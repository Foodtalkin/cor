app.controller('userdetailCtrl', ['$scope', '$routeParams','userFactory','$rootScope','authFactory', function($scope, $routeParams, userFactory, $rootScope,authFactory){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'User Details';
  

  //user details
	$scope.userid = $routeParams.userid;
  userFactory.getUserEvents($scope.userid, function(response){
    $scope.userEvents = response;
    //event and contest count
    $scope.eventCount = 0;
    $scope.contestCount = 0;
    angular.forEach($scope.userEvents.data.result.events,function(data){
      if(data.type == "event"){
        $scope.eventCount = $scope.eventCount + 1;
      }else if(data.type == "contest"){
        $scope.contestCount = $scope.contestCount +1;
      }
    })
  });

//edit Event
  $scope.userNotes = function(){
    //console.log('calling factory');
    userFactory.userNotes($scope.userEvents.data.result.id,$scope.userEvents.data.result.notes, function(response){
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  };

  //logout
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);