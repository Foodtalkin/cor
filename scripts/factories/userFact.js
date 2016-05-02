app.factory('userFactory', ['$http','urlFactory', function($http, urlFactory){
  var userFactory = {};

  //list of users
  userFactory.getAllUsers = function(callback){
    $http.get(urlFactory.users).then(function(response){
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
  return userFactory;
}]);
