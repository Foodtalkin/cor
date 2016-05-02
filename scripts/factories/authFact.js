app.factory('authFactory', ['$http','$cookies','urlFactory','$location', function($http, $cookies, urlFactory, $location){
  var service = {};
  var user = {};
  service.doLogin = function(email, password, callback){
    if(email == '' || password == ''){
      callback(false);
    }else{
      $http({
          method: 'POST',
          url: urlFactory.login,
          data : {email:email, password:password}
        }).then(function (response) {
            if(response.data.result.APPSESSID){
                $cookies.put("batuser", response.data.result.name);
                $cookies.put("batemail", response.data.result.email);
                $cookies.put("APPSESSID", response.data.result.APPSESSID);
                callback(true);
            }else{
              //Create an error Box and display the error
              callback(response);
            }
          });
    }
  }

  service.getSession = function(callback){
    session = $cookies.get("APPSESSID");
    if(session) callback(session);
    else callback(false);
  }

  service.getUsername = function(callback){
    session = $cookies.get("batuser");
    if(session) callback(session);
    else callback(false);
  }

  service.getEmail = function(callback){
    session = $cookies.get("batemail");
    if(session) callback(session);
    else callback(false);
  }

  service.logout = function(callback){
    user = {};
    $cookies.remove("batuser");
    $cookies.remove("batemail");
    $cookies.remove("APPSESSID");
    $location.path('/login');
    return true;
  }
  return service;
}]);