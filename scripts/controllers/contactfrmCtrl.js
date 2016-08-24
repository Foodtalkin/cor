app.controller('contactfrmCtrl', ['$scope','$rootScope','$location','authFactory','contactformFactory', function($scope, $rootScope,$location,authFactory, contactformFactory){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
   $scope.loader = true;

   //get data
   contactformFactory.getAlldata(function (response) {
   	 $scope.contactdata = response;
     $scope.loader = false;
   });
   //call next or prev page 
	  $scope.getpage = function(url){
      $scope.loader = true;
	    contactformFactory.getPage(url, function(response){
	      $scope.contactdata = response;
        $scope.loader = false;
	    });
	    
	  }

	 $scope.activity = false;
   //change status
   
   $scope.toggelactive = function(act,id){
   	console.log(act);
    $scope.activity = !$scope.activity;
    console.log($scope.activity);
    $scope.changeStauts(id);
  };
  $scope.changeStauts = function(id){
      //console.log('calling factory');
      $scope.loader = true;
      contactformFactory.changeStauts(id, $scope.activity, function(response){
        if(response){
            window.location.reload();
            console.log("done");
        }else{
            console.log("Le wild error");
        }
        $scope.loader = false;
      })
    }
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);
