app.factory('eventFactory', ['$http','urlFactory', function($http, urlFactory){
  var eventFactory = {};

  //get all events
  eventFactory.getAllEvents = function(callback){
    $http.get(urlFactory.events).then(function(response){
      console.log(response);
      callback(response);
    });
  }
  //event details with users
  eventFactory.getEventDetails = function(id, callback){
    $http.get(urlFactory.events+"/"+id+"/participants").then(function(response){
      callback(response);
    });
  }


  //create event function
  eventFactory.createNewEvent = function(name, s_date, loc, cost, timings, venue, cover_url, payment_url, description, callback){
    console.log('factory enter');
      $http({
          method: 'POST',
          url: urlFactory.events,
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
          url: urlFactory.events+'/'+id,
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
          url: urlFactory.events+'/'+id,
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
          url: urlFactory.events+'/'+id,
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