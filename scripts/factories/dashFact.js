app.factory('dashAnalytics', ['$http','urlFactory', function($http, urlFactory){
  var info = {};

  
  info.getGAData = function(callback){
    $http.get("api/gapi/index.php").then(function(response)
    {
      console.log(response);
      callback(response.data);
    })
  };

  info.getAllDashboard = function(callback){
    $http.get(urlFactory.dashboard).then(function(response){
      callback(response.data);
    })
  };

  info.getAPPDashboard = function(callback){
    // $http.get('http://52.74.136.146/index.php/service/analytics/summary?sessionId=GUEST').then(function(response){
    //   callback(response.data);
    // })
    $http({
    method: 'GET',
    url: 'http://52.74.136.146/index.php/service/analytics/summary?sessionId=GUEST',

    transformRequest: function(data, headersGetter) {
        delete headersGetter().appsessid;
        // delete headers.appsessid;
        // console.log(headers.appsessid);
        // return headers;
    }
    }).then(function(response){
      callback(response.data);
    });
  };
  
  return info;
}]);