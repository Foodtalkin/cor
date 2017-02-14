var app = angular.module('myApp',['ngRoute', 'ngCookies', 'ngAnimate',
 'chart.js', 'cloudinary', 'ngFileUpload', 'photoAlbumServices','ngCsv','ngSanitize',
  'mdChips', 'angularTrix','photoAlbumAnimations','photoAlbumServices','ui.mask','ImageCropper']);

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
  when('/offers',{
        templateUrl: 'views/offers.html',
        controller: 'offersCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
  when('/offers/:offerid',{
        templateUrl: 'views/offeropen.html',
        controller: 'offersopenCtrl',
        resolve: {
                    factory: checkRouting
                }
      }).
  when('/news',{
        templateUrl: 'views/news.html',
        controller: 'newsCtrl',
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
app.controller('bloggersCtrl', ['$scope','$rootScope','bloggerFactory','$location','authFactory', function($scope, $rootScope, bloggerFactory, $location,authFactory){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Bloggers';
  bloggerFactory.getAllbloggers(function(response){
    $scope.bloggers = [];
    angular.forEach(response.data.result, function(element){
      $scope.bloggers.push(element);
    });
    $scope.usercsv = [];
    
  });

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
    $scope.checkall = val;
    angular.forEach($scope.bloggers, function(blogger){
      $scope.sync(val,{a:blogger.blog,b:blogger.name,c:blogger.loaction,d:blogger.email,e:blogger.phone,f:blogger.designation,g:blogger.website});
    });
  }

  bloggerFactory.getCat(function(response){
    $scope.cat = response.data.result;
  });
  // Hide show form start
  $scope.isActivecat = true;
  $scope.toggelFormcat = function(){
    //console.log('function');
    $scope.isActivecat = !$scope.isActivecat;
  };
  $scope.isActive = true;
  $scope.toggelForm = function(){
    //console.log('function');
    $scope.isActive = !$scope.isActive;
  };
  // end
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
    bloggerFactory.createNewBloggers($scope.blog, $scope.vname, $scope.location1, $scope.email, $scope.phone, $scope.category, $scope.designation, $scope.website, $scope.facebook, $scope.facebook_page, $scope.instagram, $scope.twitter, function(response){
      if (response) {
        window.location.reload();
      } else{
        console.log('error');
      };
    });
  }
 // edit blogger
  $scope.modelactive = true;
  $scope.openmodel = function(id){
    $scope.modelactive = false;
    bloggerFactory.getblogger(id,function(response){
      $scope.bloggerdata = response.data.result;
    })
  }

  $scope.hidemodel = function(){
    $scope.modelactive = true;
    $scope.bloggerdata = {};
  }

  $scope.editdetail = function(){
    bloggerFactory.editBlogger($scope.bloggerdata.id, $scope.bloggerdata.blog, $scope.bloggerdata.name, $scope.bloggerdata.loaction, $scope.bloggerdata.email, $scope.bloggerdata.phone,  $scope.bloggerdata.designation, $scope.bloggerdata.website, $scope.bloggerdata.facebook, $scope.bloggerdata.facebook_page, $scope.bloggerdata.instagram, $scope.bloggerdata.twitter, function(response){
      window.location.reload();
    });
  }

  // delete blogger
  $scope.deletemodel = true;
  $scope.errormsg = false;
  $scope.opendeletemodel = function(id){
    $scope.deletemodel = false;
    $scope.deletemodelid = id;
  }
  $scope.hidedeletemodel = function(){
    $scope.deletemodel = true;
    $scope.deletekey = "";
    $scope.deletemodelid = "";
  }
  $scope.deleteblogger = function(){
    if ($scope.deletekey === 'DELETE') {
      bloggerFactory.deleteBlogger($scope.deletemodelid, function(response){
        window.location.reload();
      });
    }else{
      $scope.errormsg = true;
      $scope.deletekey = "";
    }
  }


  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }
}]);
//Influencers
app.controller('influencerCtrl', ['$scope','$rootScope','influencerFactory','$location','authFactory', function($scope, $rootScope, influencerFactory, $location,authFactory){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Influencer';
  influencerFactory.getAllinfluencer(function(response){
    $scope.influencer = [];
    angular.forEach(response.data.result, function(element){
      $scope.influencer.push(element);
    });
    $scope.usercsv = [];
  });

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
    $scope.checkall = val;
    angular.forEach($scope.influencer, function(influencer){
      $scope.sync(val,{a:influencer.name,b:influencer.loaction,c:influencer.address,d:influencer.email,e:influencer.phone});
    });
  }

  influencerFactory.getCat(function(response){
    $scope.cat = response.data.result;
  });
   $scope.isActivecat = true;
  $scope.toggelFormcat = function(){
    //console.log('function');
    $scope.isActivecat = !$scope.isActivecat;
  };
  $scope.isActive = true;
  $scope.toggelForm = function(){
    //console.log('function');
    $scope.isActive = !$scope.isActive;
  };
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

  // edit blogger
  $scope.modelactive = true;
  $scope.openmodel = function(id){
    $scope.modelactive = false;
    influencerFactory.getinfluencer(id,function(response){
      $scope.influencerdata = response.data.result;
    })
  }

  $scope.hidemodel = function(){
    $scope.modelactive = true;
    $scope.influencerdata = {};
  }

  $scope.editdetail = function(){
    influencerFactory.editinfluencer($scope.influencerdata.id, $scope.influencerdata.name, $scope.influencerdata.loaction, $scope.influencerdata.address, $scope.influencerdata.email, $scope.influencerdata.phone, function(response){
      window.location.reload();
    });
  }

  // delete blogger
  $scope.deletemodel = true;
  $scope.errormsg = false;
  $scope.opendeletemodel = function(id){
    $scope.deletemodel = false;
    $scope.deletemodelid = id;
  }
  $scope.hidedeletemodel = function(){
    $scope.deletemodel = true;
    $scope.deletekey = "";
    $scope.deletemodelid = "";
  }
  $scope.deleteblogger = function(){
    if ($scope.deletekey === 'DELETE') {
      influencerFactory.deleteinfluencer($scope.deletemodelid, function(response){
        window.location.reload();
      });
    }else{
      $scope.errormsg = true;
      $scope.deletekey = "";
    }
  }
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);
//Media
app.controller('mediaCtrl', ['$scope','$rootScope','mediaFactory','$location','authFactory', function($scope, $rootScope, mediaFactory, $location,authFactory){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Media';
  mediaFactory.getAllmedia(function(response){
    $scope.medias = [];
    angular.forEach(response.data.result, function(element){
      $scope.medias.push(element);
    });
    $scope.usercsv = [];
  });

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
    $scope.checkall = val;
    angular.forEach($scope.medias, function(media){
      $scope.sync(val,{a:media.orgnaization,b:media.name,c:media.loaction,d:media.email,e:media.phone,f:media.designation,g:media.website});
    });
  }

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
 $scope.isActivecat = true;
  $scope.toggelFormcat = function(){
    //console.log('function');
    $scope.isActivecat = !$scope.isActivecat;
  };
  $scope.isActive = true;
  $scope.toggelForm = function(){
    //console.log('function');
    $scope.isActive = !$scope.isActive;
  };
  $scope.createMedia = function(){
    mediaFactory.createNewMedia($scope.orgnaization, $scope.vname, $scope.location1, $scope.email, $scope.phone, $scope.category, $scope.designation, $scope.website, function(response){
      if (response) {
        window.location.reload();
      } else{
        console.log('error');
      };
    });
  }

   // edit blogger
  $scope.modelactive = true;
  $scope.openmodel = function(id){
    $scope.modelactive = false;
    mediaFactory.getmedia(id,function(response){
      $scope.mediadata = response.data.result;
    })
  }

  $scope.hidemodel = function(){
    $scope.modelactive = true;
    $scope.mediadata = {};
  }

  $scope.editdetail = function(){
    mediaFactory.editMedia($scope.mediadata.id, $scope.mediadata.orgnaization, $scope.mediadata.name, $scope.mediadata.loaction, $scope.mediadata.email, $scope.mediadata.phone, $scope.mediadata.designation, $scope.mediadata.website, function(response){
      window.location.reload();
    });
  }

  // delete blogger
  $scope.deletemodel = true;
  $scope.errormsg = false;
  $scope.opendeletemodel = function(id){
    $scope.deletemodel = false;
    $scope.deletemodelid = id;
  }
  $scope.hidedeletemodel = function(){
    $scope.deletemodel = true;
    $scope.deletekey = "";
    $scope.deletemodelid = "";
  }
  $scope.deleteblogger = function(){
    if ($scope.deletekey === 'DELETE') {
      mediaFactory.deletemedia($scope.deletemodelid, function(response){
        window.location.reload();
      });
    }else{
      $scope.errormsg = true;
      $scope.deletekey = "";
    }
  }

  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }

}]);
//Vendors 
app.controller('vendorsCtrl', ['$scope','$rootScope','vendorFactory','$location','authFactory', function($scope, $rootScope, vendorFactory, $location,authFactory){
  $scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
	$scope.message = 'Vendor';
  vendorFactory.getAllVendors(function(response){
    $scope.vendors = [];
    angular.forEach(response.data.result, function(element){
      $scope.vendors.push(element);
    });
    $scope.usercsv = [];
  });

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
    $scope.checkall = val;
    angular.forEach($scope.vendors, function(vendor){
      $scope.sync(val,{a:vendor.orgnaization,b:vendor.name,c:vendor.loaction,d:vendor.address,e:vendor.email,f:vendor.phone,g:vendor.capicity});
    });
  }

  vendorFactory.getCat(function(response){
    $scope.cat = response.data.result;
    // console.log($scope.cat);
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
   $scope.isActivecat = true;
  $scope.toggelFormcat = function(){
    //console.log('function');
    $scope.isActivecat = !$scope.isActivecat;
  };
  $scope.isActive = true;
  $scope.toggelForm = function(){
    //console.log('function');
    $scope.isActive = !$scope.isActive;
  };
  $scope.createVendor = function(){
    vendorFactory.createNewVendor($scope.orgnaization, $scope.vname, $scope.location1, $scope.address, $scope.email, $scope.phone, $scope.category, $scope.capacity, function(response){
      if (response) {
        window.location.reload();
      } else{
        console.log('error');
      };
    });
  }

  // edit blogger
  $scope.modelactive = true;
  $scope.openmodel = function(id){
    $scope.modelactive = false;
    vendorFactory.getvendor(id,function(response){
      $scope.vendordata = response.data.result;
    })
  }

  $scope.hidemodel = function(){
    $scope.modelactive = true;
    $scope.vendordata = {};
  }

  $scope.editdetail = function(){
    vendorFactory.editVendor($scope.vendordata.id, $scope.vendordata.orgnaization, $scope.vendordata.name, $scope.vendordata.loaction, $scope.vendordata.address, $scope.vendordata.email, $scope.vendordata.phone, $scope.vendordata.capicity, function(response){
      window.location.reload();
    });
  }

  // delete blogger
  $scope.deletemodel = true;
  $scope.errormsg = false;
  $scope.opendeletemodel = function(id){
    $scope.deletemodel = false;
    $scope.deletemodelid = id;
  }
  $scope.hidedeletemodel = function(){
    $scope.deletemodel = true;
    $scope.deletekey = "";
    $scope.deletemodelid = "";
  }
  $scope.deleteblogger = function(){
    if ($scope.deletekey === 'DELETE') {
      vendorFactory.deleteVendor($scope.deletemodelid, function(response){
        window.location.reload();
      });
    }else{
      $scope.errormsg = true;
      $scope.deletekey = "";
    }
  }

  $scope.logout = function(){
    authFactory.logout(function(response) {
     
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

  vendorFactory.getvendor= function(id,callback){
    $http.get(urlFactory.vendors+"/"+id).then(function(response)
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

  vendorFactory.editVendor = function(id,orgnaization, vname, location, address, email, phone,  capacity, callback){
    $http({
          method: 'PUT',
          url: urlFactory.vendors+"/"+id,
          data : {orgnaization:orgnaization, name:vname, loaction:location, address:address, email:email, phone:phone, capicity:capacity}
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

  vendorFactory.deleteVendor = function(id, callback){
    $http({
          method: 'DELETE',
          url: urlFactory.vendors+"/"+id
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
  bloggerFactory.getblogger= function(id,callback){
    $http.get(urlFactory.bloggers+"/"+id).then(function(response)
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

  bloggerFactory.createNewBloggers = function(blog, vname, location, email, phone, category, designation, website, facebook, facebook_page, instagram, twitter, callback){
    $http({
          method: 'POST',
          url: urlFactory.bloggers,
          data : {blog:blog, name:vname, loaction:location, email:email, phone:phone, vendors_category_id:category, designation:designation, website:website, facebook:facebook, facebook_page:facebook_page, instagram:instagram, twitter:twitter}
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

  bloggerFactory.editBlogger = function(id,blog, vname, location, email, phone, designation, website, facebook, facebook_page, instagram, twitter, callback){
    $http({
          method: 'PUT',
          url: urlFactory.bloggers+"/"+id,
          data : {blog:blog, name:vname, loaction:location, email:email, phone:phone, designation:designation, website:website, facebook:facebook, facebook_page:facebook_page, instagram:instagram, twitter:twitter}
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

    bloggerFactory.deleteBlogger = function(id, callback){
    $http({
          method: 'DELETE',
          url: urlFactory.bloggers+"/"+id
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
  mediaFactory.getmedia= function(id, callback){
    $http.get(urlFactory.media+"/"+id).then(function(response)
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
  mediaFactory.editMedia = function(id,orgnaization, vname, location, email, phone, designation, website, callback){
    $http({
          method: 'PUT',
          url: urlFactory.media+"/"+id,
          data : {orgnaization:orgnaization, name:vname, loaction:location, email:email, phone:phone, designation:designation, website:website}
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
  mediaFactory.deletemedia = function(id, callback){
    $http({
          method: 'DELETE',
          url: urlFactory.media+"/"+id
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
  influencerFactory.getinfluencer= function(id, callback){
    $http.get(urlFactory.influencer+"/"+id).then(function(response)
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
  influencerFactory.editinfluencer = function(id, vname, location, address, email, phone, callback){
    $http({
          method: 'PUT',
          url: urlFactory.influencer+"/"+id,
          data : {name:vname, loaction:location, address:address, email:email, phone:phone}
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
  influencerFactory.deleteinfluencer = function(id, callback){
    $http({
          method: 'DELETE',
          url: urlFactory.influencer+"/"+id
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


app.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "yy-mm-dd",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});