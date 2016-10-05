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
      var toarr = [];
      var emailarray = $scope.mail.emailto.split(",");
      angular.forEach(emailarray, function(index, el){
        
        var topush = {
          "email": index
        }
        toarr.push(topush);
      });
      

      var tosend = {
          "personalizations": [
            {
              "to": toarr,
              "subject": $scope.mail.subject
            }
          ],
          "from": {
            "email": "info@foodtalkindia.com"
          },
          "content": [
            {
              "type": "text/html",
              "value": $scope.mail.message
            }
          ]
        }
      console.log(tosend);
      mailFact.sendmail(tosend, function(response){
        console.log(response);
        $scope.openmodel = true;
        $scope.mail = {
          subject: '',
          message: '',
          emailto: ''
        };
      })
    }
	 // $scope.activity = false;
   //change status
   
   $scope.toggelactive = function(act,id){
   	// console.log(act);
    if(act == 0){
      $scope.activity = 1;
    }else{
      $scope.activity = 0;
    }
    
    // console.log($scope.activity);
    $scope.changeStauts(id);
  };
  $scope.changeStauts = function(id){
      console.log('$scope.activity');
      // $scope.loader = true;
      contactformFactory.changeStauts(id, $scope.activity, function(response){
        if(response){
            window.location.reload();
            console.log("done");
        }else{
            console.log("Le wild error");
        }
        // $scope.loader = false;
      })
    }
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);
