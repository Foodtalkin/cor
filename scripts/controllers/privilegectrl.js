app.controller('privilegeCtrl', ['$scope', '$rootScope','$location','Upload', 'cloudinary','privilegeFact',
 function($scope,$rootScope,$location, $upload, cloudinary,privilegeFact){
	$scope.username = $rootScope.username;
	$scope.email =$rootScope.useremail;

	$scope.restaurent = {};
	//$scope.restroList = {}

	

    // upload image to cloudinary
    var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    //$scope.$watch('files', function() {
    $scope.uploadFiles = function(files){
      //console.log(files);
      $scope.files = files;
      if (!$scope.files){
        return;
      }
      angular.forEach(files, function(file){

        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            $scope.cover = file.result.url;
            $rootScope.photos.push(data);
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };

    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };

    // end


    // restro get all data
    privilegeFact.getAllRestro(function(response){
    	$scope.restroList = response.data.result;
    })
    // end

    

    // create Restro
    $scope.createRestro = function(){
      $scope.createBtnRestro = true;
      if(!$scope.restaurent.name || $scope.restaurent.name == ""){
        alert("name is required");
        $scope.createBtnRestro = false;
        return;
      }
      if(!$scope.restaurent.oneliner || $scope.restaurent.oneliner == ""){
        alert("oneliner is required");
        $scope.createBtnRestro = false;
        return;
      }
      if(!$scope.restaurent.cost || $scope.restaurent.cost == ""){
        alert("cost is required");
        $scope.createBtnRestro = false;
        return;
      }
      if(!$scope.cover || $scope.cover == ""){
        alert("cover Image is required");
        $scope.createBtnRestro = false;
        return;
      }
      privilegeFact.createRestro($scope.restaurent.name, $scope.restaurent.oneliner, $scope.restaurent.cost, $scope.cover, function(response){
        if(response){
            window.location.reload();
          }else{
            alert("oops somthing went wrong try again");
            $scope.createBtnRestro = false;
          }
      })
    }
    // end


    // disable restaurant
    $scope.disableRestaurant = function(id){
      var retVal = confirm("Do you want to delete this item ?");
       if( retVal == true ){
         privilegeFact.disableRestaurant(id, function(response){
          if(response){
              window.location.reload();
            }else{
              alert("oops somthing went wrong try again");
            }
        })
       }
       else{
          return false;
       }
        
    }
    // end


	$scope.logout = function(){
		authFactory.logout(function(response) {
		 
		});
	}
}]);



app.factory('privilegeFact', ['$http', function($http){
	var prvlg = {};

	prvlg.getAllRestro = function(callback){
		$http({
			method: 'GET',
			url: 'http://stg-api.foodtalk.in/privilege/restaurant'
		}).then(function (response) {
            callback(response);
        });
	}

  prvlg.disableRestaurant = function(id, callback){
    $http({
      method: 'DELETE',
      url: 'http://stg-api.foodtalk.in/privilege/restaurant/'+id
    }).then(function (response) {
        if(response.data.code === "202"){
            callback(true);
            //console.log(response);
        }else{
          //Create an error Box and display the 
          alert('something went wrong please try again after refreshing the page');
          //console.log(response);
          callback(false);
        }
    });
  }

  prvlg.createRestro = function(name, one_liner, cost, card_image, callback){
    $http({
      method: 'POST',
      url: 'http://stg-api.foodtalk.in/privilege/restaurant',
      data : {
        'name' : name,
        'one_liner' : one_liner,
        'cost' : cost,
        'card_image' : card_image
      }
    }).then(function (response) {
        //console.log(response);
        if(response.data.code === "200"){
            callback(true);
            //console.log(response);
        }else{
          //Create an error Box and display the 
          alert('something went wrong please try again after refreshing the page');
          //console.log(response);
          callback(false);
        }
  });
  }
	return prvlg;
}])