app.factory('sessionInjector', ['$cookies', function($cookies) {  
    var sessionInjector = {
        request: function(config) {
            var session = $cookies.get("APPSESSID");
            if (session) {
                config.headers['APPSESSID'] = session;
                // console.log(config);
            }
            return config;
        }
    };
    return sessionInjector;
}]);