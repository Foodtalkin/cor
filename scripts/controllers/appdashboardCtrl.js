app.controller('appdashboardCtrl', ['$scope', '$rootScope','authFactory', function($scope, $rootScope, authFactory){
$scope.username = $rootScope.username;
    $scope.email =$rootScope.useremail;
	  

	$scope.labels = ['19-07', '20-07', '21-07', '22-07', '23-07', '24-07', '25-07'];
  $scope.series = ['Total','Android','IOS','WEB'];

	$scope.series1 = ['Total'];
  $scope.onbord = [
    [6, 101, 63, 57, 62, 52, 65],
    [2, 62, 38, 30, 38, 35, 40],
    [4, 39, 24, 25, 22, 17, 25],
    [0, 0, 1, 2, 2, 0, 0]
  ];

  $scope.active = [
    [69, 206, 167, 154, 174, 179, 203],
    [20, 86, 71, 61, 68, 75, 96],
    [46, 117, 91, 93, 102, 103, 102],
    [3, 3, 5, 0, 4, 1, 5]
  ];

  $scope.post = [
    [10, 92, 96, 86, 71, 87, 97]
  ];
  $scope.postopt ={
  	strokeColor: '##FDB45C'
  }
  $scope.comments = [
    [15, 113, 83, 41, 50, 44, 53]
  ];
  $scope.like = [
    [113, 564, 515, 481, 420, 523, 646]
  ];
  $scope.mention = [
    [5, 62, 33, 25, 37, 27, 38]
  ];
  $scope.bookmark = [
    [16, 8, 34, 33, 5, 4, 30]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };


  $scope.pielabelsuser = ["Android", "IOS", "WEB"];
  $scope.piedatauser = [312, 1860, 48];

  $scope.pielabelspost = ["Internal", "External"];
  $scope.piedatapost = [2631, 3257];
	  //logout
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }
	
}])