app.controller('contestdetailsCtrl', ['$scope', '$routeParams','contestFactory','$rootScope','authFactory', function($scope, $routeParams, contestFactory, $rootScope, authFactory){
  $scope.username = $rootScope.username;
  $scope.email =$rootScope.useremail;
	$scope.message = 'contest detail';
  //contest Details
  $scope.contestid= $routeParams.contestid;
  contestFactory.getcontestDetails($scope.contestid, function(response){
    $scope.contestDetails = response.data.result;
    $scope.allData =response;
    $scope.usercsv = [];
    //source entry count start
    $scope.srcWeb = 0;
    $scope.srcAd = 0;
    $scope.srcFb = 0;
    $scope.srcIns = 0;
    $scope.srcTw = 0;
    $scope.srcComm = 0;
    $scope.srcAPP = 0;
    $scope.srcMail = 0;
    angular.forEach($scope.contestDetails.participants, function(src){
      var src = src.pivot.source;
      if(src != null){
        src = src.replace('"','');
        src = src.replace('"','');
      }
        

      if ((src == "ad") || (src == "AD") || (src == "Ad")) {
        $scope.srcAd = $scope.srcAd + 1;
      }else if ((src == "website") || (src == "web") || (src == "store")) {
        $scope.srcWeb = $scope.srcWeb + 1;
      }else if (src == "instagram") {
        $scope.srcIns = $scope.srcIns + 1;
      }else if (src == "APP") {
        $scope.srcAPP = $scope.srcAPP + 1;
      }else if (src == "community") {
        $scope.srcComm = $scope.srcComm + 1;
      }else if (src == "facebook") {
        $scope.srcFb = $scope.srcFb + 1;
      }else if (src == "twitter") {
        $scope.srcTw = $scope.srcTw + 1;
      }else if (src == "mailer") {
        $scope.srcMail = $scope.srcMail + 1;
      }
      
    });
    //source entry count end
    $scope.totalparticipants = response.data.result.participants.length;
    $scope.activity = $scope.contestDetails.active;
    
  });
//csv creation
  $scope.isChecked = function(id){
      var match = false;
      for(var i=0 ; i < $scope.usercsv.length; i++) {
        if($scope.usercsv[i].id == id){
          match = true;
        }
      }
      return match;
  };
  $scope.sync = function(bool, item){
    if(bool){
      // add item
      $scope.usercsv.push(item);
    } else {
      // remove item
      for(var i=0 ; i < $scope.usercsv.length; i++) {
        if($scope.usercsv[i].id == item.id){
          $scope.usercsv.splice(i,1);
        }
      }      
    }
    //console.log($scope.usercsv);
  };
  $scope.selectall = function(val){
    $scope.bool = val;
    angular.forEach($scope.contestDetails.participants, function(name){
      $scope.sync(val,{a:name.name,b:name.email,c:name.contact,d:name.instagram_handle,e:name.address,f:angular.toJson(name.pivot.response)});
    })
  }
//csv end 
  //show hide form
  $scope.formisActive = true;
  $scope.detailsisActive = false;
  $scope.toggelForm = function(){
    //console.log('function');
    $scope.formisActive = !$scope.formisActive;
    $scope.detailsisActive = !$scope.detailsisActive;
  };
  //changing event to avtive and inactive
  $scope.toggelactive = function(){
    $scope.activity = !$scope.activity;
    $scope.avtiveEvent();
  };
  $scope.avtiveEvent = function(){
      //console.log('calling factory');
      contestFactory.activeEvent($scope.contestDetails.id, $scope.activity, function(response){
        if(response){
            //window.location.reload();
            console.log("done");

        }else{
            console.log("Le wild error");
        }
      })
    }
  //edit Event
  $scope.editContest = function(){
    //console.log('calling factory');
    contestFactory.editContest($scope.contestDetails.id, $scope.contestDetails.name, $scope.contestDetails.start_date, $scope.contestDetails.end_date, $scope.contestDetails.location, $scope.contestDetails.timings, $scope.contestDetails.venue, $scope.contestDetails.cover_url, $scope.contestDetails.description, function(response){
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  };


  //testing chips
  $scope.itemsCollection = [{
      title: 'Wine',
      subtitle: 'Wine'
    }, {
      title: 'Beer',
      subtitle: 'Beer'
    },{
      title: 'Vodka',
      subtitle: 'Vodka'
    },{
      title: 'Whiskey',
      subtitle: 'Whiskey'
    },{ 
      title: 'Gin',
      subtitle: 'Gin'
    },{
      title: 'Sparkling Wine',
      subtitle: 'Sparkling Wine'
    },{
      title: 'Paid',
      subtitle: 'Paid'
    },{
      title: 'RSVP',
      subtitle: 'RSVP'
    },{
      title: 'Contest',
      subtitle: 'Contest'
    },{
      title: 'Fine Dine',
      subtitle: 'Fine Dine'
    },{
      title: 'Nightlife',
      subtitle: 'Nightlife'
    }];

    $scope.selectedtags = [];

    $scope.checkboxVal = {
      variable: false,
      unique: true
    };

    $scope.check = function(){
      $timeout(function(){
        $scope.$apply();
      });
    };
    $scope.savetag = [];
    //add tags
  $scope.savetags = function(){

    
    angular.forEach($scope.selectedtags, function(selectedtags){
      $scope.savetag.push(selectedtags.title);
    });
    contestFactory.savetags($scope.contestDetails.id, $scope.savetag, function(response){

      //console.log($scope.selectedtags);
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  };

  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);
