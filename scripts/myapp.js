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
  when('/all_data', {
        templateUrl: 'views/all_data.html',
        controller: 'allDataCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
	otherwise({
        redirectTo: '/login'
      });
}]);





















//App Controllers
//Body Controller
app.controller('bodyCtrl', ['$scope','$rootScope','$location', function($scope, $rootScope, $location){
  $scope.message = "This is master body controller";
}]);

//Dashboard
app.controller('dashboardCtrl', ['$scope','authFactory', '$location', '$http','$rootScope','dashAnalytics','userFactory',  function($scope, authFactory, $location, $http, $rootScope, dashAnalytics, userFactory){
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [0,0,0,0,0,0,0]
  ];
  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  userFactory.getAllUsers(function(response){
    $scope.users = response;
  });

  dashAnalytics.getGAData(function(response){
    $scope.ga = {};
    $scope.ga.labels = response.date;
    $scope.ga.series = ['Food Talk India', 'Food Talk in'];
    $scope.ga.data = [];
    $scope.ga.data[0] = response.fti;
    $scope.ga.data[1] = response.ftp;
    //console.log($scope.ga);
  });

  dashAnalytics.getAllDashboard(function(response){
    $scope.analysis = response;
    $scope.fbfti = {};
    $scope.fbfti.labels = response.result[0].dashboard_date;
    $scope.fbfti.series = ['Food Talk India'];
    $scope.fbfti.data = [];
    $scope.fbfti.data[0] = response.result[0].dashboard_count;
    $scope.fbfti.data[1] = [245000,245000,245000,245000,245000,245000,245000];

    $scope.fbftp = {};
    $scope.fbftp.labels = response.result[1].dashboard_date;
    $scope.fbftp.series = [ 'Food Talk Plus'];
    $scope.fbftp.data = [];
    $scope.fbftp.data[0] = response.result[1].dashboard_count;
    $scope.fbftp.data[1] = [0,0,0,0,0,0,0];

    $scope.insta = {};
    $scope.insta.labels = response.result[2].dashboard_date;
    $scope.insta.series = ['Instagram'];
    $scope.insta.data = [];
    $scope.insta.data[0] = response.result[2].dashboard_count;
    $scope.insta.data[1] = [170000,170000,170000,170000,170000,170000,170000];

    $scope.twit = {};
    $scope.twit.labels = response.result[3].dashboard_date;
    $scope.twit.series = ['Twitter'];
    $scope.twit.data = [];
    $scope.twit.data[0] = response.result[3].dashboard_count;
    $scope.twit.data[1] = [64020,64020,64020,64020,64020,64020,64020];

    $scope.mailc = {};
    $scope.mailc.labels = response.result[4].dashboard_date;
    $scope.mailc.series = ['MailChimp'];
    $scope.mailc.data = [];
    $scope.mailc.data[0] = response.result[4].dashboard_count;
    $scope.mailc.data[1] = [4200,4200,4200,4200,4200,4200,4200];
  });


  authFactory.getUsername(function(response){
    $rootScope.username = response;
  });

  authFactory.getEmail(function(response){
    $rootScope.useremail = response;
  });

   $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
  //LOGOUT - This Will Go everywhere see if you can add it to the rootscope
  $scope.logout = function(){
    authFactory.logout().then($location.path('/login'));
  }

  $scope.doPing = function(){
    $http.get("http://api.foodtalkindia.com/user", {headers : {'Content-Type':'text/plain'}}).then(function(response){
      console.log(response);
    });
  }
  $scope.message = 'This is dashboard';
}]);

//Login
app.controller('loginCtrl', ['$scope', 'authFactory', '$location', function($scope, authFactory, $location){
  $scope.doLogin = function(){
    authFactory.doLogin($scope.username, $scope.password, function(response){
      if(response){
        $location.path('/dashboard');
      }else{
        //Display generic error
        console.log("Le wild login error");
      }
    });
  }
}]);

//User
app.controller('usersCtrl', ['$scope','userFactory','$rootScope', function($scope, userFactory, $rootScope){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Users';
  userFactory.getAllUsers(function(response){
    $scope.users = response;
  });
  $scope.getpage = function(url){
    userFactory.getUsersPage(url, function(response){
      $scope.users = response;
    })
  }
}]);
//User Details
app.controller('userdetailCtrl', ['$scope', '$routeParams','userFactory','$rootScope', function($scope, $routeParams, userFactory, $rootScope){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'User Details';
	$scope.userid = $routeParams.userid;
  userFactory.getUserEvents($scope.userid, function(response){
    $scope.userEvents = response;
  });

}]);
//Events
app.controller('eventsCtrl', ['$scope','eventFactory','$rootScope','$location', function($scope, eventFactory, $rootScope, $location){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Events';
  eventFactory.getAllEvents(function(response){
    $scope.events = response;
    //console.log($scope.events);
  });
  $scope.isActive = true;
  $scope.toggelForm = function(){
    console.log('function');
    $scope.isActive = !$scope.isActive;
  };
  $scope.createEvent = function(){
    console.log('calling factory');
    eventFactory.createNewEvent($scope.ename, $scope.s_date, $scope.loc, $scope.cost, $scope.timings, $scope.venue, $scope.coverurl, $scope.Paymenturl,$scope.desc, function(response){
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  }

}]);
//Event Details
app.controller('eventdetailCtrl', ['$scope','$routeParams','eventFactory','$rootScope', function($scope, $routeParams, eventFactory, $rootScope){
  //logged in user Details
  $scope.username = $rootScope.username;
  $scope.email =$rootScope.useremail;
	$scope.message = 'Event detail';
  $scope.eventid= $routeParams.eventid;
  //event data
  eventFactory.getEventDetails($scope.eventid, function(response){
    $scope.eventsDetails = response.data.result;
    $scope.allData =response;
    //console.log($scope.eventsDetails);
    $scope.totalparticipants = response.data.result.participants.length;
    $scope.activity = $scope.eventsDetails.active;
    $scope.usercsv = [];
    //console.log($scope.activity);
  });
  //creating csv code
  
  $scope.isChecked = function(id){
      var match = false;
      for(var i=0 ; i < $scope.usercsv.length; i++) {
        if($scope.usercsv[i].id == id){
          match = true;
        }
      }
      return match;
  };
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
  $scope.selectall = function(val){
    $scope.bool = val;
    angular.forEach($scope.eventsDetails.participants, function(name){
      $scope.sync(val,{a:name.name,b:name.email,c:name.contact,d:name.instagram_handle,e:name.address,f:angular.toJson(name.pivot.response)});
    })
  }
  
  //show hide form
  $scope.formisActive = true;
  $scope.detailsisActive = false;
  $scope.toggelForm = function(){
    //console.log('function');
    $scope.formisActive = !$scope.formisActive;
    $scope.detailsisActive = !$scope.detailsisActive;
  };
  //changing event to avtive and inactive
  $scope.toggelactive = function(){
    $scope.activity = !$scope.activity;
    $scope.avtiveEvent();
  };
  $scope.avtiveEvent = function(){
      //console.log('calling factory');
      eventFactory.activeEvent($scope.eventsDetails.id, $scope.activity, function(response){
        if(response){
            //window.location.reload();
            console.log("done");

        }else{
            console.log("Le wild error");
        }
      })
    }
  //edit Event
  $scope.editEvent = function(){
    //console.log('calling factory');
    eventFactory.editEvent($scope.eventsDetails.id, $scope.eventsDetails.name, $scope.eventsDetails.start_date, $scope.eventsDetails.location, $scope.eventsDetails.cost, $scope.eventsDetails.timings, $scope.eventsDetails.venue, $scope.eventsDetails.cover_url, $scope.eventsDetails.payment_url,$scope.eventsDetails.description, function(response){
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  };


  //testing chips
  $scope.itemsCollection = [{
      title: 'Wine',
      subtitle: 'Wine'
    }, {
      title: 'Beer',
      subtitle: 'Beer'
    },{
      title: 'Vodka',
      subtitle: 'Vodka'
    },{
      title: 'Whiskey',
      subtitle: 'Whiskey'
    },{ 
      title: 'Gin',
      subtitle: 'Gin'
    },{
      title: 'Sparkling Wine',
      subtitle: 'Sparkling Wine'
    },{
      title: 'Paid',
      subtitle: 'Paid'
    },{
      title: 'RSVP',
      subtitle: 'RSVP'
    },{
      title: 'Contest',
      subtitle: 'Contest'
    },{
      title: 'Fine Dine',
      subtitle: 'Fine Dine'
    },{
      title: 'Nightlife',
      subtitle: 'Nightlife'
    }];

    $scope.selectedtags = [];

    $scope.checkboxVal = {
      variable: false,
      unique: true
    };

    $scope.check = function(){
      $timeout(function(){
        $scope.$apply();
      });
    };
    $scope.savetag = [];
    //add tags
  $scope.savetags = function(){

    
    angular.forEach($scope.selectedtags, function(selectedtags){
      $scope.savetag.push(selectedtags.title);
    });
    eventFactory.savetags($scope.eventsDetails.id, $scope.savetag, function(response){

      //console.log($scope.selectedtags);
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  };
}]);

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
}]);
//Contest
app.controller('contestCtrl', ['$scope','contestFactory','$rootScope','$location', function($scope, contestFactory, $rootScope,$location){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Contest';
  contestFactory.getAllContest(function(response){
    $scope.contest = response;
  });

  $scope.isActive = true;
  $scope.toggelForm = function(){
    //console.log('function');
    $scope.isActive = !$scope.isActive;
  };
 
  $scope.createContest = function(){
    contestFactory.createNewContest($scope.ename, $scope.s_date, $scope.end_date, $scope.loc, $scope.timings, $scope.venue, $scope.coverurl, $scope.desc, function(response){
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  }
}]);
//Contest Details
app.controller('contestdetailsCtrl', ['$scope', '$routeParams','contestFactory','$rootScope', function($scope, $routeParams, contestFactory, $rootScope){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'contest detail';
  $scope.contestid= $routeParams.contestid;
  contestFactory.getcontestDetails($scope.contestid, function(response){
    $scope.contestDetails = response.data.result;
    $scope.allData =response;
    //console.log($scope.eventsDetails);
    $scope.totalparticipants = response.data.result.participants.length;
    $scope.activity = $scope.contestDetails.active;
    $scope.usercsv = [];
  });
  $scope.isChecked = function(id){
      var match = false;
      for(var i=0 ; i < $scope.usercsv.length; i++) {
        if($scope.usercsv[i].id == id){
          match = true;
        }
      }
      return match;
  };
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
  $scope.selectall = function(val){
    $scope.bool = val;
    angular.forEach($scope.contestDetails.participants, function(name){
      $scope.sync(val,{a:name.name,b:name.email,c:name.contact,d:name.instagram_handle,e:name.address,f:angular.toJson(name.pivot.response)});
    })
  }
  
  //show hide form
  $scope.formisActive = true;
  $scope.detailsisActive = false;
  $scope.toggelForm = function(){
    //console.log('function');
    $scope.formisActive = !$scope.formisActive;
    $scope.detailsisActive = !$scope.detailsisActive;
  };
  //changing event to avtive and inactive
  $scope.toggelactive = function(){
    $scope.activity = !$scope.activity;
    $scope.avtiveEvent();
  };
  $scope.avtiveEvent = function(){
      //console.log('calling factory');
      contestFactory.activeEvent($scope.contestDetails.id, $scope.activity, function(response){
        if(response){
            //window.location.reload();
            console.log("done");

        }else{
            console.log("Le wild error");
        }
      })
    }
  //edit Event
  $scope.editContest = function(){
    //console.log('calling factory');
    contestFactory.editContest($scope.contestDetails.id, $scope.contestDetails.name, $scope.contestDetails.start_date, $scope.contestDetails.end_date, $scope.contestDetails.location, $scope.contestDetails.timings, $scope.contestDetails.venue, $scope.contestDetails.cover_url, $scope.contestDetails.description, function(response){
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  };


  //testing chips
  $scope.itemsCollection = [{
      title: 'Wine',
      subtitle: 'Wine'
    }, {
      title: 'Beer',
      subtitle: 'Beer'
    },{
      title: 'Vodka',
      subtitle: 'Vodka'
    },{
      title: 'Whiskey',
      subtitle: 'Whiskey'
    },{ 
      title: 'Gin',
      subtitle: 'Gin'
    },{
      title: 'Sparkling Wine',
      subtitle: 'Sparkling Wine'
    },{
      title: 'Paid',
      subtitle: 'Paid'
    },{
      title: 'RSVP',
      subtitle: 'RSVP'
    },{
      title: 'Contest',
      subtitle: 'Contest'
    },{
      title: 'Fine Dine',
      subtitle: 'Fine Dine'
    },{
      title: 'Nightlife',
      subtitle: 'Nightlife'
    }];

    $scope.selectedtags = [];

    $scope.checkboxVal = {
      variable: false,
      unique: true
    };

    $scope.check = function(){
      $timeout(function(){
        $scope.$apply();
      });
    };
    $scope.savetag = [];
    //add tags
  $scope.savetags = function(){

    
    angular.forEach($scope.selectedtags, function(selectedtags){
      $scope.savetag.push(selectedtags.title);
    });
    contestFactory.savetags($scope.contestDetails.id, $scope.savetag, function(response){

      //console.log($scope.selectedtags);
      if(response){
          window.location.reload();
      }else{
          console.log("Le wild error");
      }
    })
  };
}]);


//User
app.controller('allDataCtrl', ['$scope','dataFactory','$rootScope', function($scope, dataFactory, $rootScope){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
  $scope.message = '';
   dataFactory.getAllData(function(response){
      $scope.entries = response;
   });
}]);

















//Factories & Services
//Authentication Factory
app.factory('authFactory', ['$http','$cookies','urlFactory', function($http, $cookies, urlFactory){
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

  service.logout = function(){
    user = {};
    $cookies.remove("batuser");
    $cookies.remove("batemail");
    $cookies.remove("APPSESSID");
    return $q.when(user);
  }
  return service;
}]);

//Login Check
var checkRouting = function ($location, $cookies) {    
    if ($cookies.get("APPSESSID")) {
        return true;
    } else {
        $location.path("/login");
    }
};

//Injectory Factory
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

app.factory('userFactory', ['$http','urlFactory', function($http, urlFactory){
  var userFactory = {};

  userFactory.getAllUsers = function(callback){
    $http.get(urlFactory.users).then(function(response){
      callback(response);
    });
  }

  userFactory.getUsersPage = function(url,callback){
    $http.get(url).then(function(response){
      callback(response);
    });
  }

  userFactory.getUserEvents = function(id, callback){
    $http.get(urlFactory.users+"/"+id+"/events").then(function(response){
      callback(response);
    });
  }

  return userFactory;
}]);

app.factory('dataFactory', ['$http', function($http){
  var dataFactory = {};

  dataFactory.getAllData = function(callback){
    $http.get("api/all_data.php").then(function(response){
      //console.log(response);
      callback(response);
    });
  }
  return dataFactory;
}]);

app.factory('eventFactory', ['$http','urlFactory', function($http, urlFactory){
  var eventFactory = {};

  eventFactory.getAllEvents = function(callback){
    $http.get(urlFactory.events).then(function(response){
      callback(response);
    });
  }
  eventFactory.getEventDetails = function(id, callback){
    $http.get("http://api.foodtalkindia.com/api/event/"+id+"/participants").then(function(response){
      callback(response);
    });
  }


  //create event function
  eventFactory.createNewEvent = function(name, s_date, loc, cost, timings, venue, cover_url, payment_url, description, callback){
    console.log('factory enter');
      $http({
          method: 'POST',
          url: 'http://api.foodtalkindia.com/api/event',
          data : {name:name, start_date:s_date, location:loc, cost:cost, timings:timings, venue:venue, cover_url:cover_url, payment_url:payment_url, description:description}
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

  //edit event function
  eventFactory.editEvent = function(id, name, s_date, loc, cost, timings, venue, cover_url, payment_url, description, callback){
    console.log('factory enter');
      $http({
          method: 'PUT',
          url: 'http://api.foodtalkindia.com/api/event/'+id,
          data : {name:name, start_date:s_date, location:loc, cost:cost, timings:timings, venue:venue, cover_url:cover_url, payment_url:payment_url, description:description}
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

  //save tags function
  eventFactory.savetags = function(id, tags, callback){
      $http({
          method: 'PUT',
          url: 'http://api.foodtalkindia.com/api/event/'+id,
          data : {tags:tags}
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

  //active inactive event
  eventFactory.activeEvent = function(id, active, callback){
    console.log(active);
      $http({
          method: 'PUT',
          url: 'http://api.foodtalkindia.com/api/event/'+id,
          data : {active:active}
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

  return eventFactory;
}]);

app.factory('contestFactory', ['$http','urlFactory', function($http, urlFactory){
  var contestFactory = {};

  contestFactory.getAllContest = function(callback){
    $http.get(urlFactory.contest).then(function(response)
    {
      callback(response);
    });
  }

  contestFactory.getcontestDetails = function(id, callback){
    $http.get(urlFactory.contest+"/"+id+"/participants").then(function(response){
      callback(response);
    });
  }
  contestFactory.createNewContest = function(name, s_date, end_date, loc, timings, venue, cover_url, description, callback){
    
      $http({
          method: 'POST',
          url: urlFactory.contest,
          data : {name:name, start_date:s_date, end_date:end_date, location:loc, timings:timings, venue:venue, cover_url:cover_url, description:description}
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

  //edit event function
  contestFactory.editContest = function(id, name, s_date, end_date, loc, timings, venue, cover_url, description, callback){
    console.log('factory enter');
      $http({
          method: 'PUT',
          url: urlFactory.contest+'/'+id,
          data : {name:name, start_date:s_date, end_date:end_date, location:loc, timings:timings, venue:venue, cover_url:cover_url, description:description}
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

  //save tags function
  contestFactory.savetags = function(id, tags, callback){
      $http({
          method: 'PUT',
          url: urlFactory.contest+'/'+id,
          data : {tags:tags}
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

  //active inactive event
  contestFactory.activeEvent = function(id, active, callback){
    console.log(active);
      $http({
          method: 'PUT',
          url: urlFactory.contest+'/'+id,
          data : {active:active}
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
  return contestFactory;
}]);

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

app.factory('urlFactory', [ function(){
  var url = {};

  url.dashboard = "http://api.foodtalkindia.com/api/dashboard/batcave";
  url.login= "http://api.foodtalkindia.com/login";
  url.logout = "http://api.foodtalkindia.com/logout";
  url.users = "http://api.foodtalkindia.com/user";
  url.contest = "http://api.foodtalkindia.com/api/contest";
  url.events = "http://api.foodtalkindia.com/api/event";
  url.vendors = "http://api.foodtalkindia.com/api/vendor";
  url.influencer = "http://api.foodtalkindia.com/api/influencer";
  url.bloggers = "http://api.foodtalkindia.com/api/bloggers";
  url.media = "http://api.foodtalkindia.com/api/media";
  url.vendorscat = "http://api.foodtalkindia.com/api/vendor/category";
  url.influencercat = "http://api.foodtalkindia.com/api/influencer/category";
  url.bloggerscat = "http://api.foodtalkindia.com/api/bloggers/category";
  url.mediacat = "http://api.foodtalkindia.com/api/media/category";
  return url;
}]);

app.factory('dashAnalytics', ['$http','urlFactory', function($http, urlFactory){
  var info = {};

  info.getFbFTICount = function(){};
  info.getFbFTPCount = function(){};
  info.getInstaCount = function(){};
  info.getMailchimpCount = function(){};
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
  info.getLocalEventContest = function(){};
  info.getLocalUserCount = function(){};

  return info;
}])



app.filter('ageFilter', function() {
     function calculateAge(birthday) { // birthday is a date
        var bday =new Date(birthday);
         var ageDifMs = Date.now() - bday;
         var ageDate = new Date(ageDifMs); // miliseconds from epoch
         return Math.abs(ageDate.getUTCFullYear() - 1970);
     }

     return function(birthdate) { 
     return calculateAge(birthdate);
     }; 
});

app.filter('instahandle', function () {
        return function (text) {
      
      if(text.charAt(0) == '@'){
        return text.replace('@','');
      }else{
      return text;
      }
    
    };
})

app.filter('tojson', function () {
        return function (text) {
          return angular.toJson(text);
      }
})

