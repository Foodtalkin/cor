app.controller('dashboardCtrl', ['$scope','authFactory', '$location', '$http','$rootScope','dashAnalytics','userFactory',  function($scope, authFactory, $location, $http, $rootScope, dashAnalytics, userFactory){
  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  userFactory.getAllUsers(function(response){
    $scope.users = response;
  });

  //google analytics
  dashAnalytics.getGAData(function(response){
    $scope.ga = {};
    $scope.ga.labels = response.date;
    $scope.ga.series = ['Food Talk India', 'Food Talk in'];
    $scope.ga.data = [];
    $scope.ga.data[0] = [0,0,0,0,0,0,0,0];
    $scope.ga.data[1] = response.ftp;
    //console.log($scope.ga);
  });

  dashAnalytics.getAllDashboard(function(response){

    //facebook
    $scope.analysis = response;
    $scope.fbfti = {};
    $scope.fbfti.labels = response.result[0].dashboard_date;
    $scope.fbfti.series = ['Food Talk India'];
    $scope.fbfti.data = [];
    $scope.fbfti.data[0] = response.result[0].dashboard_count;
    $scope.fbfti.data[1] = [245000,245000,245000,245000,245000,245000,245000,245000];

    //instagram
    $scope.insta = {};
    $scope.insta.labels = response.result[2].dashboard_date;
    $scope.insta.series = ['Instagram'];
    $scope.insta.data = [];
    $scope.insta.data[0] = response.result[2].dashboard_count;
    $scope.insta.data[1] = [170000,170000,170000,170000,170000,170000,170000,170000];

    //twitter
    $scope.twit = {};
    $scope.twit.labels = response.result[3].dashboard_date;
    $scope.twit.series = ['Twitter'];
    $scope.twit.data = [];
    $scope.twit.data[0] = response.result[3].dashboard_count;
    $scope.twit.data[1] = [64020,64020,64020,64020,64020,64020,64020,64020];

    //mailchimp
    $scope.mailc = {};
    $scope.mailc.labels = response.result[4].dashboard_date;
    $scope.mailc.series = ['MailChimp'];
    $scope.mailc.data = [];
    $scope.mailc.data[0] = response.result[4].dashboard_count;
    $scope.mailc.data[1] = [4200,4200,4200,4200,4200,4200,4200,4200];
  });


  authFactory.getUsername(function(response){
    $rootScope.username = response;
  });

  authFactory.getEmail(function(response){
    $rootScope.useremail = response;
  });

   $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
  //LOGOUT - This Will Go everywhere see if you can add it to the rootscope
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

  $scope.message = 'This is dashboard';
  
}]);