app.controller('contactfrmCtrl', ['$scope','$rootScope','$location','authFactory','contactformFactory','mailFact', function($scope, $rootScope,$location,authFactory, contactformFactory,mailFact){
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
    $scope.openmodel = true;
    $scope.mail = {
      subject: '',
      message: '',
      emailto: ''
    };
    $scope.openmodelfun = function(email){
      $scope.openmodel = false;
      $scope.mail.emailto = email;
    }
    $scope.hidemodel = function() {
      $scope.openmodel = true;
      $scope.mail = {
        subject: '',
        message: '',
        emailto: ''
      };
    }

    $scope.sendmail = function() {
      mailFact.sendmail($scope.mail.emailto, $scope.mail.subject, $scope.mail.message, function(response){
        console.log(response);
        $scope.openmodel = true;
        $scope.mail = {
          subject: '',
          message: '',
          emailto: ''
        };
      })
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
