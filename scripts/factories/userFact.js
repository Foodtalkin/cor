app.factory('userFactory', ['$http','urlFactory', function($http, urlFactory){
  var userFactory = {};

  //list of users
  userFactory.getAllUsers = function(callback){
    $http.get(urlFactory.users).then(function(response){
      callback(response);
    });
  }

  //list of on app users
  userFactory.getonappusers = function(callback){
    $http.get(urlFactory.onappusers).then(function(response){
      callback(response);
    });
  }

  //list of non app users
  userFactory.getnonappusers = function(callback){
    $http.get(urlFactory.nonappusers).then(function(response){
      callback(response);
    });
  }
  //user next page or prev page
  userFactory.getUsersPage = function(url,callback){
    $http.get(url).then(function(response){
      callback(response);
    });
  }

  //get a user's details
  userFactory.getUserEvents = function(id, callback){
    $http.get(urlFactory.users+"/"+id).then(function(response){
      callback(response);
    });
  }

  //create a user's notes
  userFactory.userNotes = function(id, notes, callback){
    $http.put(urlFactory.users+"/"+id).then(function(response){
      callback(response);
    });
    $http({
      method: 'PUT',
      url: urlFactory.users+'/'+id,
      data : {notes:notes}
    }).then(function (response) {
        if(response.data.message === "Success"){
            callback(true);
            console.log(response);
        }else{
          //Create an error Box and display the 
          console.log(response);
          callback(false);

        }
      });
}

  //search user table
  userFactory.getsearchresult = function(key, callback){
    $http.get(urlFactory.searchuser+"/"+key).then(function(response){
      callback(response);
    });
  }
  //search users by tag
  userFactory.getsearchtags = function(key, callback){
    $http.get(urlFactory.searchuserTag+"/"+key).then(function(response){
      callback(response);

    });
  }

  // delhi data
  userFactory.getDelUsers = function(callback){
    $http.get(urlFactory.cityusers+"/1").then(function(response){
      callback(response);
    });
  }
  // mumbai data
  userFactory.getMumUsers = function(callback){
    $http.get(urlFactory.cityusers+"/2").then(function(response){
      callback(response);
    });
  }
  // pune data
  userFactory.getPuneUsers = function(callback){
    $http.get(urlFactory.cityusers+"/3").then(function(response){
      callback(response);
    });
  }
  // bangalore data
  userFactory.getBnglUsers = function(callback){
    $http.get(urlFactory.cityusers+"/4").then(function(response){
      callback(response);
    });
  }
  // other data
  userFactory.getOthUsers = function(callback){
    $http.get(urlFactory.cityusers).then(function(response){
      callback(response);
    });
  }
  return userFactory;
}]);
