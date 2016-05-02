app.controller('contestCtrl', ['$scope','contestFactory','$rootScope','$location','authFactory', function($scope, contestFactory, $rootScope,$location,authFactory){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Contest';
  contestFactory.getAllContest(function(response){
    $scope.contest = response;
  });
//show hide form
  $scope.isActive = true;
  $scope.toggelForm = function(){
    //console.log('function');
    $scope.isActive = !$scope.isActive;
  };
 //create contest
  $scope.createContest = function(){
    contestFactory.createNewContest($scope.ename, $scope.s_date, $scope.end_date, $scope.loc, $scope.timings, $scope.venue, $scope.coverurl, $scope.desc, function(response){
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  }

  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);