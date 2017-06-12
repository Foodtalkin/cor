app.controller('dashboardCtrl', ['$scope','authFactory', '$location', '$http','$rootScope','dashAnalytics','userFactory',  function($scope, authFactory, $location, $http, $rootScope, dashAnalytics, userFactory){
  // $scope.loader = true;
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  userFactory.getAllUsers(function(response){
    $scope.users = response;
  });

  //google analytics
  // dashAnalytics.getGAData(function(response){
  //   console.log(response);
  //   $scope.ga = {};
  //   $scope.ga.labels = response.date;
  //   $scope.ga.series = ['Food Talk India', 'Food Talk in'];
  //   $scope.ga.data = [];
  //   $scope.ga.data[0] = [0,0,0,0,0,0,0,0];
  //   $scope.ga.data[1] = response.ftp;
    
  // });

  // $scope. = function(){
  //   console.log('work');
  //   dashAnalytics.logininstagram(function(response){
  //     console.log(response);
  //   })
  // }


  dashAnalytics.getAllDashboard(function(response){
    console.log('dashboard data');
    console.log(response);
    
    $scope.twit = {};
    $scope.twit.labels = response.result[0].dashboard_date;
    $scope.twit.series = ['Twitter'];
    $scope.twit.data = [];
    $scope.twit.data[0] = response.result[0].dashboard_count;
    //$scope.twit.data[1] = [64020,64020,64020,64020,64020,64020,64020,64020];

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