app.controller('privilegeExperienceCtrl', ['$scope','$rootScope', 'privilegeExperienceFact','authFactory',
 function($scope,$rootScope,privilegeExperienceFact, authFactory){
 	$scope.username = $rootScope.username;
	$scope.email =$rootScope.useremail;
	$scope.usercsv = [];


	$scope.allData = {};
	privilegeExperienceFact.GetList(function(response){
		$scope.allData = response.data.result;
    //console.log($scope.allData);
	});

	// csv download
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

  //put all data in csv
  $scope.selectall = function(val){
    $scope.bool = val;
    $scope.checkall = val;
    angular.forEach($scope.allData, function(item){
      $scope.sync(val,{a:item.event_name,b:item.name,c:item.email,d:item.phone,e:item.gender,f:item.preference});
    });
  }


	$scope.logout = function(){
		authFactory.logout(function(response) {
		 
		});
	}
}]);
app.factory('privilegeExperienceFact', ['$http', function($http){
	var privilegeExperienceFact = {};
	privilegeExperienceFact.GetList = function(callback){
		$http({
			method: 'GET',
			url: 'http://api.foodtalk.in/privilege/user/event'
		}).then(function (response) {
            callback(response);
        });
	}
	return privilegeExperienceFact;
}])