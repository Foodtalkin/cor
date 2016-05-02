app.controller('usersCtrl', ['$scope','userFactory','$rootScope','authFactory', function($scope, userFactory, $rootScope, authFactory){
    $scope.username = $rootScope.username;
    $scope.email =$rootScope.useremail;
	   $scope.message = 'Users';
  
  //add or remove row in csv

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
    angular.forEach($scope.users, function(name){
      $scope.sync(val,{a:name.name,b:name.email,c:name.contact,d:name.instagram_handle,e:name.address});
    });
  }

  //get user details and create csv
  userFactory.getAllUsers(function(response){
    $scope.users = response.data.result.data;
    $scope.current_page = response.data.result.current_page;
    $scope.total = response.data.result.total;
    $scope.usercsv = [];
    $scope.selectall(true);
  });
  //call next or prev page and create csv
  $scope.getpage = function(url){
    userFactory.getUsersPage(url, function(response){
      $scope.users = response.data.result.data;
      $scope.current_page = response.data.result.current_page;
    $scope.total = response.data.result.total;
      $scope.usercsv = [];
      $scope.selectall(true);
    });
    
  }
  
  //Search for users using the API and create csv
  $scope.searchuser = function(searchkey){
    userFactory.getsearchresult(searchkey, function(response){
      $scope.users = response.data.result.data;
      $scope.usercsv = [];
      $scope.current_page = response.data.result.current_page;
    $scope.total = response.data.result.total;
      $scope.selectall(true);
    });
    
  }

  //Search for the users by the tags they are attached to and create csv
  $scope.selectedtags = "";
  
  
  $scope.searchtags = function(key){
    userFactory.getsearchtags(key, function(response){
      //console.log(response.data.result);
      $scope.users = response.data.result;
      $scope.usercsv = [];
    $scope.selectall(true);
    });
    
  }

  //logout
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);