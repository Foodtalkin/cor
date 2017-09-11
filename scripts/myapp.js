var app = angular.module('myApp',['ngRoute', 'ngCookies', 'ngAnimate',
 'chart.js', 'cloudinary', 'ngFileUpload', 'photoAlbumServices','ngCsv','ngSanitize',
  'mdChips', 'angularTrix','photoAlbumAnimations','photoAlbumServices','ui.mask','ImageCropper','720kb.datepicker'
  ,'autocomplete']);

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
  when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
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
  when('/privilege',{
    templateUrl: 'views/privilege.html',
        controller: 'privilegeCtrl',
        resolve: {
                    factory: checkRouting
                }
  }).
  when('/privilege/:restroid',{
    templateUrl: 'views/prvlgrestrentopen.html',
        controller: 'privilegeRestroDetailsctrl',
        resolve: {
                    factory: checkRouting
                }
  }).
  when('/privilege/:restroid/outlet/:outletid',{
    templateUrl: 'views/outletopen.html',
        controller: 'outletCtrl',
        resolve: {
                    factory: checkRouting
                }
  }).
  when('/privilegeExperience',{
    templateUrl: 'views/privilegeExperience.html',
    controller : 'privilegeExperienceCtrl'
  }).
	otherwise({
        redirectTo: '/login'
      });
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

app.directive('multipleEmails', function () {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {

        var emails = viewValue.split(',');
        // loop that checks every email, returns undefined if one of them fails.
        var re = /\S+@\S+\.\S+/;

        // angular.foreach(emails, function() {
          var validityArr = emails.map(function(str){
              return re.test(str.trim());
          }); // sample return is [true, true, true, false, false, false]
          //console.log(emails, validityArr); 
          var atLeastOneInvalid = false;
          angular.forEach(validityArr, function(value) {
            if(value === false)
              atLeastOneInvalid = true; 
          }); 
          if(!atLeastOneInvalid) {
            // ^ all I need is to call the angular email checker here, I think.
            ctrl.$setValidity('multipleEmails', true);
            return viewValue;
          } else {
            ctrl.$setValidity('multipleEmails', false);
            return undefined;
          }
        // })
      });
    }
  };
});