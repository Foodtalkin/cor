var app = angular.module('myApp',['ngRoute', 'ngCookies', 'ngAnimate', 'chart.js', 'cloudinary', 'ngFileUpload', 'photoAlbumServices','ngCsv','ngSanitize', 'mdChips']);

app.run(function($rootScope){
  
});

app.config(['$routeProvider','$httpProvider',function($routeProvider, $httpProvider) {
	$httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  $httpProvider.defaults.headers.get = {};
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  

  $httpProvider.interceptors.push('sessionInjector');

  $routeProvider.
	when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
  when('/appdashboard',{
        templateUrl: 'views/appdashboard.html',
        controller: 'appdashboardCtrl',
        resolve: {
                    factory: checkRouting
                }
  }).
  when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	when('/users', {
        templateUrl: 'views/users.html',
        controller: 'usersCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	when('/events', {
        templateUrl: 'views/events.html',
        controller: 'eventsCtrl',
         resolve: {
                    factory: checkRouting
                }
      }).
	when('/events/:eventid', {
        templateUrl: 'views/eventdetail.html',
        controller: 'eventdetailCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	when('/bloggers', {
        templateUrl: 'views/bloggers.html',
        controller: 'bloggersCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	when('/influencer', {
        templateUrl: 'views/influencer.html',
        controller: 'influencerCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	when('/media', {
        templateUrl: 'views/media.html',
        controller: 'mediaCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	when('/vendors', {
        templateUrl: 'views/vendors.html',
        controller: 'vendorsCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	when('/contest', {
        templateUrl: 'views/contest.html',
        controller: 'contestCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	when('/contest/:contestid', {
        templateUrl: 'views/contestdetails.html',
        controller: 'contestdetailsCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	when('/user/:userid', {
        templateUrl: 'views/userdetail.html',
        controller: 'userdetailCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
  when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'contactsCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
  when('/creatcontacts', {
        templateUrl: 'views/creatcontacts.html',
        controller: 'creatcontactsCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
  when('/editcontacts/:id', {
        templateUrl: 'views/editcontacts.html',
        controller: 'editcontactsCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
  when('/contacts/:id', {
        templateUrl: 'views/showcontacts.html',
        controller: 'showcontactsCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
  when('/contactfrm',{
        templateUrl: 'views/contactfrm.html',
        controller: 'contactfrmCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).

	otherwise({
        redirectTo: '/login'
      });
}]);









//App Controllers


//Bloggers
app.controller('bloggersCtrl', ['$scope','$rootScope','bloggerFactory','$location', function($scope, $rootScope, bloggerFactory, $location){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Bloggers';
  bloggerFactory.getAllbloggers(function(response){
    $scope.bloggers = [];
    angular.forEach(response.data.result, function(element){
      $scope.bloggers.push(element);
    });
  });
  bloggerFactory.getCat(function(response){
    $scope.cat = response.data.result;
  });

  $scope.createCat = function(){
    bloggerFactory.createCategory($scope.catname, $scope.catdesc, function(response){
    if (response) {
      window.location.reload();
    } else{
      console.log('error');
    };
  });
  }

  $scope.createblogger = function(){
    bloggerFactory.createNewBloggers($scope.blog, $scope.vname, $scope.location1, $scope.email, $scope.phone, $scope.category, $scope.designation, $scope.website, function(response){
      if (response) {
        window.location.reload();
      } else{
        console.log('error');
      };
    });
  }

  $scope.logout = function(){
    authFactory.logout(function(response) {
     
      if(response){
         $location.path('/login');
      }else{
        //Display generic error
        console.log("Le wild login error");
      }

    });
  }

}]);
//Influencers
app.controller('influencerCtrl', ['$scope','$rootScope','influencerFactory','$location', function($scope, $rootScope, influencerFactory, $location){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Influencer';
  influencerFactory.getAllinfluencer(function(response){
    $scope.influencer = [];
    angular.forEach(response.data.result, function(element){
      $scope.influencer.push(element);
    });
  });

  influencerFactory.getCat(function(response){
    $scope.cat = response.data.result;
  });

  $scope.createCat = function(){
    influencerFactory.createCategory($scope.catname, $scope.catdesc, function(response){
    if (response) {
      window.location.reload();
    } else{
      console.log('error');
    };
  });
  }

  $scope.createInfluencer = function(){
    influencerFactory.createNewInfluencer($scope.vname, $scope.location1, $scope.address, $scope.email, $scope.phone, $scope.category, function(response){
      if (response) {
        window.location.reload();
      } else{
        console.log('error');
      };
    });
  }

  $scope.logout = function(){
    authFactory.logout(function(response) {
     
      if(response){
         $location.path('/login');
      }else{
        //Display generic error
        console.log("Le wild login error");
      }

    });
  }

}]);
//Media
app.controller('mediaCtrl', ['$scope','$rootScope','mediaFactory','$location', function($scope, $rootScope, mediaFactory, $location){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Media';
  mediaFactory.getAllmedia(function(response){
    $scope.medias = [];
    angular.forEach(response.data.result, function(element){
      $scope.medias.push(element);
    });
  });
  mediaFactory.getCat(function(response){
    $scope.cat = response.data.result;
  });

  $scope.createCat = function(){
    mediaFactory.createCategory($scope.catname, $scope.catdesc, function(response){
    if (response) {
      window.location.reload();
    } else{
      console.log('error');
    };
  });
  }

  $scope.createMedia = function(){
    mediaFactory.createNewMedia($scope.orgnaization, $scope.vname, $scope.location1, $scope.email, $scope.phone, $scope.category, $scope.designation, $scope.website, function(response){
      if (response) {
        window.location.reload();
      } else{
        console.log('error');
      };
    });
  }

  $scope.logout = function(){
    authFactory.logout(function(response) {
     
      if(response){
         $location.path('/login');
      }else{
        //Display generic error
        console.log("Le wild login error");
      }

    });
  }

}]);
//Vendors 
app.controller('vendorsCtrl', ['$scope','$rootScope','vendorFactory','$location', function($scope, $rootScope, vendorFactory, $location){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Vendor';
  vendorFactory.getAllVendors(function(response){
    $scope.vendors = [];
    angular.forEach(response.data.result, function(element){
      $scope.vendors.push(element);
    });
  });

  vendorFactory.getCat(function(response){
    $scope.cat = response.data.result;
    console.log($scope.cat);
  });
  $scope.createCat = function(){
    vendorFactory.createCategory($scope.catname, $scope.catdesc, function(response){
    if (response) {
      window.location.reload();
    } else{
      console.log('error');
    };
  });
  }

  $scope.createVendor = function(){
    vendorFactory.createNewVendor($scope.orgnaization, $scope.vname, $scope.location1, $scope.address, $scope.email, $scope.phone, $scope.category, $scope.capacity, function(response){
      if (response) {
        window.location.reload();
      } else{
        console.log('error');
      };
    });
  }

  $scope.logout = function(){
    authFactory.logout(function(response) {
     
      if(response){
         $location.path('/login');
      }else{
        //Display generic error
        console.log("Le wild login error");
      }

    });
  }

}]);







//Factories & Services

//Login Check
var checkRouting = function ($location, $cookies) {    
    if ($cookies.get("APPSESSID")) {
        return true;
    } else {
        $location.path("/login");
    }
};


//vendor
app.factory('vendorFactory', ['$http','urlFactory', function($http, urlFactory){
  var vendorFactory= {};

  vendorFactory.getAllVendors= function(callback){
    $http.get(urlFactory.vendors).then(function(response)
    {
      callback(response);
    });
  }

  vendorFactory.createNewVendor = function(orgnaization, vname, location, address, email, phone, category, capacity, callback){
    $http({
          method: 'POST',
          url: urlFactory.vendors,
          data : {orgnaization:orgnaization, name:vname, loaction:location, address:address, email:email, phone:phone, vendors_category_id:category, capicity:capacity}
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

  vendorFactory.createCategory = function(name, desc, callback){
     $http({
          method: 'POST',
          url: urlFactory.vendorscat,
          data : {name:name, desc:desc}
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

  vendorFactory.getCat= function(callback){
    $http.get(urlFactory.vendorscat).then(function(response)
    {
      callback(response);
    });
  }

  return vendorFactory;
}]);
//blogger
app.factory('bloggerFactory', ['$http','urlFactory', function($http, urlFactory){
  var bloggerFactory= {};

  bloggerFactory.getAllbloggers= function(callback){
    $http.get(urlFactory.bloggers).then(function(response)
    {
      callback(response);
    });
  }

  bloggerFactory.getCat= function(callback){
    $http.get(urlFactory.bloggerscat).then(function(response)
    {
      callback(response);
    });
  }

  bloggerFactory.createNewBloggers = function(blog, vname, location, email, phone, category, designation, website, callback){
    $http({
          method: 'POST',
          url: urlFactory.bloggers,
          data : {blog:blog, name:vname, loaction:location, email:email, phone:phone, vendors_category_id:category, designation:designation, website:website}
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

  bloggerFactory.createCategory = function(name, desc, callback){
     $http({
          method: 'POST',
          url: urlFactory.bloggerscat,
          data : {name:name, desc:desc}
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

  return bloggerFactory;
}]);

//media
app.factory('mediaFactory', ['$http','urlFactory', function($http, urlFactory){
  var mediaFactory= {};

  mediaFactory.getAllmedia= function(callback){
    $http.get(urlFactory.media).then(function(response)
    {
      callback(response);
    });
  }

  mediaFactory.getCat= function(callback){
    $http.get(urlFactory.mediacat).then(function(response)
    {
      callback(response);
    });
  }

  mediaFactory.createNewMedia = function(orgnaization, vname, location, email, phone, category, designation, website, callback){
    $http({
          method: 'POST',
          url: urlFactory.media,
          data : {orgnaization:orgnaization, name:vname, loaction:location, email:email, phone:phone, vendors_category_id:category, designation:designation, website:website}
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

  mediaFactory.createCategory = function(name, desc, callback){
     $http({
          method: 'POST',
          url: urlFactory.mediacat,
          data : {name:name, desc:desc}
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
  return mediaFactory;
}]);
//influencer
app.factory('influencerFactory', ['$http','urlFactory', function($http, urlFactory){
  var influencerFactory= {};

  influencerFactory.getAllinfluencer= function(callback){
    $http.get(urlFactory.influencer).then(function(response)
    {
      callback(response);
    });
  }

  influencerFactory.getCat= function(callback){
    $http.get(urlFactory.influencercat).then(function(response)
    {
      callback(response);
    });
  }


  influencerFactory.createNewInfluencer = function(vname, location, address, email, phone, category, callback){
    $http({
          method: 'POST',
          url: urlFactory.influencer,
          data : {name:vname, loaction:location, address:address, email:email, phone:phone, vendors_category_id:category}
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
  influencerFactory.createCategory = function(name, desc, callback){
     $http({
          method: 'POST',
          url: urlFactory.influencercat,
          data : {name:name, desc:desc}
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

  return influencerFactory;
}]);
