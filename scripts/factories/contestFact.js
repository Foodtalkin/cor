app.factory('contestFactory', ['$http','urlFactory', function($http, urlFactory){
  var contestFactory = {};

  //get list of contest
  contestFactory.getAllContest = function(callback){
    $http.get(urlFactory.contest).then(function(response)
    {
      callback(response);
    });
  }

  //get details of contest with users
  contestFactory.getcontestDetails = function(id, callback){
    $http.get(urlFactory.contest+"/"+id+"/participants").then(function(response){
      callback(response);
    });
  }

  //create new contest
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

  //edit contest
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