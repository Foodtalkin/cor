app.factory('dashAnalytics', ['$http','urlFactory', function($http, urlFactory){
  var info = {};

  
  info.getGAData = function(callback){
    $http.get("api/gapi/index.php").then(function(response)
    {
      callback(response.data);
    })
  };
  info.getAllDashboard = function(callback){
    $http.get(urlFactory.dashboard).then(function(response){
      callback(response.data);
    })
  };
  
  return info;
}]);