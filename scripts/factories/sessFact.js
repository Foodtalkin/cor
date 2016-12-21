app.factory('sessionInjector', ['$cookies', function($cookies) {  
    var sessionInjector = {
        request: function(config) {
            var session = $cookies.get("APPSESSID");
            // console.log(config.url);
            if(config.url == 'http://52.74.136.146/index.php/service/analytics/summary?sessionId=GUEST'){
                // console.log('');
            }else if(config.url == 'https://api.cloudinary.com/v1_1/digital-food-talk-pvt-ltd/upload'){
                //https://api.cloudinary.com/v1_1/digital-food-talk-pvt-ltd/upload
            }else if(config.url == 'http://52.74.136.146/index.php/service/news/list?sessionId=GUEST&status=all'){

            }else if(config.url == 'http://52.74.136.146/index.php/service/news/upsert'){

            }else{
                if (session) {
                    config.headers['APPSESSID'] = session;
                    // console.log(config);
                }
            }
            
            return config;
        }
    };
    return sessionInjector;
}]);