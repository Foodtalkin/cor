app.factory('newsFactory', ['$http', function($http){
	var newsFactory = {};

	newsFactory.getallnews = function(page,callback){
    $http({
      method: 'GET',
      url: 'http://52.74.136.146/index.php/service/news/list',
      params: {sessionId:"GUEST", status:'all', page:page}
    }).then(function (response) {
      callback(response);
    });
	}

	newsFactory.createNews = function(title, coverImage, description, source, sourceUrl,startDate, callback){
    console.log('factory enter');
      $http({
          method: 'POST',
          url: 'http://52.74.136.146/index.php/service/news/upsert',
          data : {sessionId:"GUEST", title:title, coverImage:coverImage, description:description, source:source, sourceUrl:sourceUrl, startDate:startDate}
        }).then(function (response) {
            if(response.data.status === "OK"){
                callback(true);
                console.log(response);
            }else{
              //Create an error Box and display the 
              console.log(response);
              callback(false);

            }
          });
    
  	}


  	newsFactory.editNews = function(id, title, description, source, sourceUrl,startDate, callback){
    console.log('factory enter');
      $http({
          method: 'POST',
          url: 'http://52.74.136.146/index.php/service/news/upsert',
          data : {sessionId:"GUEST", id:id, title:title, description:description, source:source, sourceUrl:sourceUrl,startDate:startDate}
        }).then(function (response) {
            if(response.data.status === "OK"){
                callback(true);
                console.log(response);
            }else{
              //Create an error Box and display the 
              console.log(response);
              callback(false);

            }
          });
  	}
  	newsFactory.activeNews = function(id, active, callback){
    console.log('factory enter');
      $http({
          method: 'POST',
          url: 'http://52.74.136.146/index.php/service/news/upsert',
          data : {sessionId:"GUEST", id:id, isDisabled:active}
        }).then(function (response) {
            if(response.data.status === "OK"){
                callback(true);
                console.log(response);
            }else{
              //Create an error Box and display the 
              console.log(response);
              callback(false);

            }
          });
  	}
	return newsFactory;
}])