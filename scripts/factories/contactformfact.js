app.factory('contactformFactory', ['$http','urlFactory', function($http, urlFactory){
  var contactformFactory = {};

  //Get contact form data
  contactformFactory.getAlldata = function(callback){
    $http.get(urlFactory.contactform).then(function(response){
      callback(response);
    });
  }

  //user next page or prev page
  contactformFactory.getPage = function(url,callback){
    $http.get(url).then(function(response){
      callback(response);
    });
  }
  
  //change status
  // contactformFactory.activeEvent = function(id, active, callback){
  //   console.log(active);
  //     $http({
  //         method: 'PUT',
  //         url: urlFactory.contactform+'/'+id,
  //         data : {active:active}
  //       }).then(function (response) {
  //           if(response.data.message === "Success"){
  //               callback(true);
  //               console.log(response);
  //           }else{
  //             //Create an error Box and display the 
  //             console.log(response);
  //             callback(false);

  //           }
  //         });
  // }
  return contactformFactory;
}]);
