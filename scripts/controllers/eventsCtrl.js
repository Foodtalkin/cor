app.controller('eventsCtrl', ['$scope','eventFactory','$rootScope','$location','authFactory', function($scope, eventFactory, $rootScope, $location,authFactory){
  $scope.username = $rootScope.username;
  $scope.email =$rootScope.useremail;
	$scope.message = 'Events';
  //event List
  eventFactory.getAllEvents(function(response){
    $scope.events = response;
    //console.log($scope.events);
  });
  //Hide un hide create event form
  $scope.isActive = true;
  $scope.toggelForm = function(){
    console.log('function');
    $scope.isActive = !$scope.isActive;
  };

  //create new event
  $scope.createEvent = function(){
    console.log('calling factory');
    eventFactory.createNewEvent($scope.ename, $scope.s_date, $scope.loc, $scope.cost, $scope.timings, $scope.venue, $scope.coverurl, $scope.Paymenturl,$scope.desc, function(response){
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  }

//logout
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);