app.controller('eventdetailCtrl', ['$scope','$routeParams','eventFactory','$rootScope','authFactory', function($scope, $routeParams, eventFactory, $rootScope, authFactory){
  //logged in user Details
  $scope.username = $rootScope.username;
  $scope.email =$rootScope.useremail;
  $scope.loader = true;
	$scope.message = 'Event detail';
  $scope.eventid= $routeParams.eventid;
  
  //event data
  eventFactory.getEventDetails($scope.eventid, function(response){
    $scope.eventsDetails = response.data.result;
    $scope.allData =response;

  //gettong source details
    //source entry count start
    $scope.srcWeb = 0;
    $scope.srcAd = 0;
    $scope.srcFb = 0;
    $scope.srcIns = 0;
    $scope.srcTw = 0;
    $scope.srcComm = 0;
    $scope.srcAPP = 0;
    $scope.srcMail = 0;

    angular.forEach($scope.eventsDetails.participants, function(src){     
      var src = src.pivot.source;
      if(src){
        src = src.replace('"','');//removing ""
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
    //entry count
    $scope.totalparticipants = response.data.result.participants.length;
    $scope.activity = $scope.eventsDetails.active;
    $scope.usercsv = [];
    //console.log($scope.activity);
    $scope.loader = false;
  });
  // all user
  $scope.getallusersdata = function () {
    $scope.loader = true;
     var temp = [];
     eventFactory.getEventDetails($scope.eventid, function(response){
      $scope.eventsDetails = response.data.result;
      $scope.allData =response;
       $scope.totalparticipants = $scope.eventsDetails.participants.length;
       $scope.loader = false;
     })   
  }
  // on app user
  $scope.getonappusersdata = function () {
    $scope.loader = true;
     var temp = [];
     eventFactory.getEventDetails($scope.eventid, function(response){
      $scope.eventsDetails = response.data.result;
      $scope.allData =response;
        angular.forEach( $scope.allData.data.result.participants, function(element, index) {
         if(element.score){
          if(element.score.isAppUser == '1'){
            // appuser
            temp.push(element);
          }else{
          // non app user
          }
         }else{
          // non app user
         }
       });
       $scope.eventsDetails.participants = temp;
       $scope.totalparticipants = $scope.eventsDetails.participants.length;
       $scope.loader = false;
     })
       
  }
  // non app
  $scope.getnonappusersdata = function () {
    $scope.loader = true;
     var temp = [];
     eventFactory.getEventDetails($scope.eventid, function(response){
      $scope.eventsDetails = response.data.result;
      $scope.allData =response;
        angular.forEach( $scope.allData.data.result.participants, function(element, index) {
         if(element.score){
          if(element.score.isAppUser == '1'){
            // appuser
            // console.log(element);
            
          }else{
          // non app user
          temp.push(element);
          }
         }else{
          // non app user
          temp.push(element);
         }
       });
       $scope.eventsDetails.participants = temp;
       $scope.totalparticipants = $scope.eventsDetails.participants.length;
       $scope.loader = false;
     })   
  }
  //creating csv code
    // $scope.isChecked = function(id){
    //     var match = false;
    //     for(var i=0 ; i < $scope.usercsv.length; i++) {
    //       if($scope.usercsv[i].id == id){
    //         match = true;
    //       }
    //     }
    //     return match;
    // };
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
      // console.log($scope.usercsv);
    };
    $scope.selectall = function(val){
      $scope.bool = val;
      $scope.checkall = val;
      angular.forEach($scope.eventsDetails.participants, function(name){
        $scope.sync(val,{a:name.name,b:name.email,c:name.contact,d:name.instagram_handle,e:name.address,f:name.city,g:angular.toJson(name.pivot.response),h:angular.toJson(name.metadata),i:name.dob});
      })
    }
  
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
      eventFactory.activeEvent($scope.eventsDetails.id, $scope.activity, function(response){
        if(response){
            //window.location.reload();
            console.log("done");

        }else{
            console.log("Le wild error");
        }
      })
    }
  //edit Event
  $scope.editEvent = function(){
    $scope.loader = true;
    //console.log('calling factory');
    eventFactory.editEvent($scope.eventsDetails.id, $scope.eventsDetails.name, $scope.eventsDetails.start_date, $scope.eventsDetails.location, $scope.eventsDetails.cost, $scope.eventsDetails.timings, $scope.eventsDetails.venue, $scope.eventsDetails.cover_url, $scope.eventsDetails.payment_url,$scope.eventsDetails.description, function(response){
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
      $scope.loader = false;
    })
  };


// chips
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
    $scope.loader = true;
  //creating array for tags 
    angular.forEach($scope.selectedtags, function(selectedtags){
      $scope.savetag.push(selectedtags.title);
    });
    eventFactory.savetags($scope.eventsDetails.id, $scope.savetag, function(response){

      //console.log($scope.selectedtags);
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
      $scope.loader = false;
    })
  };

//logout
  $scope.logout = function(){
    authFactory.logout(function(response) {

    });
  }

}]);