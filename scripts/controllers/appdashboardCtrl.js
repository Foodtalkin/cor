app.controller('appdashboardCtrl', ['$scope', '$rootScope','authFactory','dashAnalytics', function($scope, $rootScope, authFactory,dashAnalytics){
$scope.username = $rootScope.username;
    $scope.email =$rootScope.useremail;
    $scope.data = {};
    $scope.overalluser = [];
	  $scope.androidcnt = 0;
    $scope.ioscnt = 0;
    $scope.webcnt = 0;
    $scope.totuser = 0;
    $scope.postcount = 0;
    $scope.internalpost = 0;
    $scope.userspost = 0;
    $scope.weaklydata = {};
    $scope.labels = [];
    $scope.onbord = [];
    $scope.onbordtot = [];
    $scope.onbordios = [];
    $scope.onbordand = [];
    $scope.onbordweb = [];
    $scope.active = [];
    $scope.acttot = [];
    $scope.actand = [];
    $scope.actios = [];
    $scope.actweb = [];
    $scope.post = [];
    $scope.comments = [];
  $scope.like = [];
  $scope.mention = [];
  $scope.bookmark = [];
  dashAnalytics.getAPPDashboard(function(response){
    $scope.data = response.result;
    
    $scope.overalluser = $scope.data.overall.user;
    $scope.postcount = $scope.data.overall.posts[0].cnt;
    $scope.internalpost = $scope.data.overall.internalposts[0].cnt;
    $scope.weaklydata = $scope.data.weakly;
    console.log($scope.weaklydata);

    // user count per plateform
    angular.forEach($scope.overalluser, function(value, key) {
      if(value.platform == 'android'){
        $scope.androidcnt = value.cnt;
      }else if (value.platform == 'ios') {
        $scope.ioscnt = value.cnt;
      }else if (value.platform == 'web') {
        $scope.webcnt = value.cnt;
      }
    });
    $scope.totuser = parseInt($scope.androidcnt)+parseInt($scope.ioscnt)+parseInt($scope.webcnt);
    $scope.pielabelsuser = ["Android", "IOS", "WEB"];
    $scope.piedatauser = [$scope.androidcnt, $scope.ioscnt, $scope.webcnt];
    // user count per plateform end


    //Post count
    $scope.userspost = parseInt($scope.postcount)-parseInt($scope.internalpost);
    $scope.pielabelspost = ["Internal", "External"];
    $scope.piedatapost = [$scope.internalpost, $scope.userspost];
    //Post count end


    // onboarding total users
        angular.forEach($scope.weaklydata.onbordingUsers,function (value, key) {
           /* body... */ 
           $scope.labels.push(value.onbord);
           $scope.onbordtot.push(value.cnt);
        });
        // onbordin via platform
        angular.forEach($scope.weaklydata.onbordingUserWithPlatform,function (value, key) {
           /* body... */ 
              if(value.platform == "android"){
                $scope.onbordand.push(value.cnt);
              }else if (value.platform == "ios") {
                $scope.onbordios.push(value.cnt);
              }else if (value.platform == "web") {
                $scope.onbordweb.push(value.cnt)
              }

        });

        // creating onbord data
        $scope.onbord.push($scope.onbordtot);
        $scope.onbord.push($scope.onbordand);
        $scope.onbord.push($scope.onbordios);
        $scope.onbord.push($scope.onbordweb);
    // end

    // active user graph
        angular.forEach($scope.weaklydata.activeUser,function (value, key) {
           /* body... */ 
              if(value.platform == "android"){
                $scope.actand.push(value.cnt);
              }else if (value.platform == "ios") {
                $scope.actios.push(value.cnt);
              }else if (value.platform == "web") {
                $scope.actweb.push(value.cnt);
              }
        });
        for(var i = 0; i<=7; i++){
          var temp = parseInt($scope.actand[i])+parseInt($scope.actios[i])+parseInt($scope.actweb[i]);
          $scope.acttot.push(temp);
        }
        $scope.active.push($scope.acttot);
        $scope.active.push($scope.actand);
        $scope.active.push($scope.actios);
        $scope.active.push($scope.actweb);

        


    $scope.post.push(creatingdatasingle ($scope.weaklydata.posts));
    $scope.comments.push(creatingdatasingle ($scope.weaklydata.comments));
    $scope.like.push(creatingdatasingle ($scope.weaklydata.likes));
    $scope.mention.push(creatingdatasingle ($scope.weaklydata.userMentioned));
    $scope.bookmark.push(creatingdatasingle ($scope.weaklydata.bookmarks));

    $scope.avgonbord = avg ($scope.onbordtot);
    $scope.avgactive = avg ($scope.acttot);
    $scope.avgpost = avg (creatingdatasingle ($scope.weaklydata.posts));
    $scope.avgcomment = avg (creatingdatasingle ($scope.weaklydata.comments));
    $scope.avglike = avg (creatingdatasingle ($scope.weaklydata.likes));
    $scope.avgmention = avg (creatingdatasingle ($scope.weaklydata.userMentioned));
    $scope.avgbookmark = avg (creatingdatasingle ($scope.weaklydata.bookmarks));
  });
  
  function creatingdatasingle (obj) {
    var temp = [];
     angular.forEach(obj, function(value, key) {
       temp.push(parseInt(value.cnt));
     });
     return temp;
  }

  function avg (obj) {
     var tot = parseInt(obj[0])+parseInt(obj[1])+parseInt(obj[2])+parseInt(obj[3])+parseInt(obj[4])+parseInt(obj[5])+parseInt(obj[6])+parseInt(obj[7]);
     var avg = tot/8;
     return avg;
  }

  $scope.series = ['Total','Android','IOS','WEB'];
  $scope.actseries = ['Total','Android','IOS','WEB'];

	$scope.series1 = ['Total'];
  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

	  //logout
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }
	
}])