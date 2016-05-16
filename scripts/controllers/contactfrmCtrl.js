app.controller('contactfrmCtrl', ['$scope','$rootScope','$location','authFactory','contactformFactory', function($scope, $rootScope,$location,authFactory, contactformFactory){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;

   //get data
   contactformFactory.getAlldata(function (response) {
   	 $scope.contactdata = response;
   });
   //call next or prev page 
	  $scope.getpage = function(url){
	    contactformFactory.getPage(url, function(response){
	      $scope.contactdata = response;
	    });
	    
	  }

	 $scope.activity = false;
   //change status
   
   $scope.toggelactive = function(act,id){
   	console.log(act);
    $scope.activity = !$scope.activity;
    console.log($scope.activity);
    // $scope.avtiveEvent(id);
  };
  $scope.avtiveEvent = function(id){
      //console.log('calling factory');
      contestFactory.activeEvent(id, $scope.activity, function(response){
        if(response){
            //window.location.reload();
            console.log("done");

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
