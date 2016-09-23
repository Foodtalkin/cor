app.controller('usersCtrl', ['$scope','userFactory','$rootScope','authFactory', function($scope, userFactory, $rootScope, authFactory){
    $scope.username = $rootScope.username;
    $scope.email =$rootScope.useremail;
    $scope.loader = true;
	   $scope.message = 'Users';
  $scope.togglename = false;
  $scope.toggleemail = false;
  $scope.togglephone = false;
  $scope.togglecity = false;
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
    $scope.AlluserData = response;
    $scope.users = response.data.result.data;
    $scope.userdata = response;
    $scope.current_page = response.data.result.current_page;
    $scope.total = response.data.result.total;
    $scope.usercsv = [];
    // $scope.selectall(true);
    $scope.loader = false;
  });

  // all users
  $scope.getallusersdata = function () {
    $scope.loader = true;
    userFactory.getAllUsers(function(response){
      $scope.AlluserData = response;
      $scope.users = response.data.result.data;
      $scope.userdata = response;
      $scope.current_page = response.data.result.current_page;
      $scope.total = response.data.result.total;
      $scope.usercsv = [];
      // $scope.selectall(true);
      $scope.loader = false;
    });
  }
  // on app
  $scope.getonappusersdata = function () {
    $scope.loader = true;
    userFactory.getonappusers(function(response){
      $scope.AlluserData = response;
      $scope.users = response.data.result.data;
      $scope.userdata = response;
      $scope.current_page = response.data.result.current_page;
      $scope.total = response.data.result.total;
      $scope.usercsv = [];
      // $scope.selectall(true);
      $scope.loader = false;
    });
  }
  // non app
  $scope.getnonappusersdata = function () {
    $scope.loader = true;
    userFactory.getnonappusers(function(response){
      $scope.AlluserData = response;
      $scope.users = response.data.result.data;
      $scope.userdata = response;
      $scope.current_page = response.data.result.current_page;
      $scope.total = response.data.result.total;
      $scope.usercsv = [];
      // $scope.selectall(true);
      $scope.loader = false;
    });
  }
  // delhi
  userFactory.getDelUsers(function(response){
    $scope.DelhiuserData = response;
    $scope.Delhitotal = response.data.result.total;
  });
  // mumbai
  userFactory.getMumUsers(function(response){
    $scope.MumbaiuserData = response;
    $scope.Mumbaitotal = response.data.result.total;
  });

  // Pune
  userFactory.getPuneUsers(function(response){
    $scope.PuneuserData = response;
    $scope.Punetotal = response.data.result.total;
  });
  // bangalore
  userFactory.getBnglUsers(function(response){
    $scope.bangaloreuserData = response;
    $scope.bangaloretotal = response.data.result.total;
  });
  // Other
  userFactory.getOthUsers(function(response){
    $scope.OtheruserData = response;
    $scope.Othertotal = response.data.result.total;
  });

  $scope.getdatabycity = function(city){
    $scope.loader = true;
    if(city == "0"){
      $scope.users = $scope.AlluserData.data.result.data;
      $scope.userdata = $scope.AlluserData;
      $scope.current_page = $scope.AlluserData.data.result.current_page;
      $scope.total = $scope.AlluserData.data.result.total;
      $scope.usercsv = [];
      // $scope.selectall(true);
      $scope.loader = false;
    }else if (city == "1") {
      $scope.users = $scope.DelhiuserData.data.result.data;
      $scope.userdata = $scope.DelhiuserData;
      $scope.current_page = $scope.DelhiuserData.data.result.current_page;
      $scope.total = $scope.DelhiuserData.data.result.total;
      $scope.usercsv = [];
      // $scope.selectall(true);
      $scope.loader = false;
    }else if (city == "2") {
      $scope.users = $scope.MumbaiuserData.data.result.data;
      $scope.userdata = $scope.MumbaiuserData;
      $scope.current_page = $scope.MumbaiuserData.data.result.current_page;
      $scope.total = $scope.MumbaiuserData.data.result.total;
      $scope.usercsv = [];
      // $scope.selectall(true);
      $scope.loader = false;
    }else if (city == "3") {
      $scope.users = $scope.PuneuserData.data.result.data;
      $scope.userdata = $scope.PuneuserData;
      $scope.current_page = $scope.PuneuserData.data.result.current_page;
      $scope.total = $scope.PuneuserData.data.result.total;
      $scope.usercsv = [];
      // $scope.selectall(true);
      $scope.loader = false;
    }else if (city == "4") {
      $scope.users = $scope.bangaloreuserData.data.result.data;
      $scope.userdata = $scope.bangaloreuserData;
      $scope.current_page = $scope.bangaloreuserData.data.result.current_page;
      $scope.total = $scope.bangaloreuserData.data.result.total;
      $scope.usercsv = [];
      // $scope.selectall(true);
      $scope.loader = false;
    }else if (city == "5") {
      $scope.users = $scope.OtheruserData.data.result.data;
      $scope.userdata = $scope.OtheruserData;
      $scope.current_page = $scope.OtheruserData.data.result.current_page;
      $scope.total = $scope.OtheruserData.data.result.total;
      $scope.usercsv = [];
      // $scope.selectall(true);
      $scope.loader = false;
    }else{
      $scope.users = null;
      $scope.loader = false;
    }
  }

  

  //call next or prev page and create csv
  $scope.getpage = function(url){
    $scope.loader = true;
    userFactory.getUsersPage(url, function(response){
      $scope.users = response.data.result.data;
      $scope.current_page = response.data.result.current_page;
    $scope.total = response.data.result.total;
      $scope.usercsv = [];
      $scope.selectall(true);
      $scope.loader = false;
    });
    
  }
  
  //Search for users using the API and create csv
  $scope.searchuser = function(searchkey){
    $scope.loader = true;
    userFactory.getsearchresult(searchkey, function(response){
      $scope.users = response.data.result.data;
      $scope.usercsv = [];
      $scope.current_page = response.data.result.current_page;
    $scope.total = response.data.result.total;
      $scope.selectall(true);
      $scope.loader = false;
    });
    
  }

  //Search for the users by the tags they are attached to and create csv
  $scope.selectedtags = "";
  
  
  $scope.searchtags = function(key){
    $scope.loader = true;
    userFactory.getsearchtags(key, function(response){
      //console.log(response.data.result);
      $scope.users = response.data.result;
      $scope.usercsv = [];
    $scope.selectall(true);
    $scope.loader = false;
    });
    
  }

  //logout
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);