app.controller('offersopenCtrl', ['$scope','$rootScope','$location','authFactory','$routeParams', 'offerFactory', function($scope, $rootScope,$location,authFactory,$routeParams, offerFactory){
	$scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
   $scope.offerdetails = {};

   // $scope.loader = true;
   var offerid = $routeParams.offerid;
    offerFactory.getOfferDetails(offerid,function(response){
        if(response){
          $scope.offerdetails = response.data.storeOffer;
          console.log(response);
        }else{
          console.log("Le wild error");
        }
      });
    
    $scope.editoffer = function(){
      if(!$scope.offerdetails.title && !$scope.offerdetails.cardActionButtonText && !$scope.offerdetails.actionButtonText && !$scope.offerdetails.description && !$scope.offerdetails.shortDescription && !$scope.offerdetails.termConditionsLink && !$scope.offerdetails.thankYouText && !$scope.offerdetails.startDate && !$scope.offerdetails.endDate && !$scope.offerdetails.cityText){
        alert('all fields are required, please check your form and try again');
        return;
      }
      offerFactory.updateOffer($scope.offerdetails.id,$scope.offerdetails.title,
    $scope.offerdetails.cardActionButtonText,$scope.offerdetails.actionButtonText,
    $scope.offerdetails.description,$scope.offerdetails.shortDescription,
    $scope.offerdetails.termConditionsLink,$scope.offerdetails.thankYouText,
    $scope.offerdetails.startDate,$scope.offerdetails.endDate,$scope.offerdetails.cityText,function(response){
      if(response){
        window.location.reload();
      }else{
        console.log("Le wild error");
      }
    })
    }

    $scope.toggelactive = function(activity){
      console.log($scope.offerdetails.isDisabled);
      if(activity == '0'){
        activity = '1';
      }else{
        activity = '0';
      }
      //activity = !activity;
      console.log(activity);
      $scope.avtiveoffer(activity);
    };
    
    $scope.avtiveoffer = function (activity) {
      offerFactory.activeOffer(offerid,activity, function(response){
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