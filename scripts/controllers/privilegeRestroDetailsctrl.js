app.controller('privilegeRestroDetailsctrl', ['$scope', '$rootScope','$location','Upload', 'cloudinary','privilegeFact2','$routeParams','$http','authFactory',
 function($scope, $rootScope, $location,$upload, cloudinary, privilegeFact2,$routeParams,$http,authFactory){
	$scope.username = $rootScope.username;
	$scope.email =$rootScope.useremail;

	$scope.outlet = {};
	$scope.restroData = {};
	$scope.restroid= $routeParams.restroid;
	privilegeFact2.getrestrodata($scope.restroid, function(response){
		$scope.restroData = response.data.result;
    // console.log($scope.restroData);
	});

  privilegeFact2.getcusine(function(response){
      $scope.cusinelist = response.data.result;
      
    });


  $scope.addcusine = function(){
    privilegeFact2.addcusine($scope.restroid, $scope.selectedCusine, function(response){
      if(response){
            window.location.reload();
          }else{
            alert("oops somthing went wrong try again");
          }
    })
  }

  $scope.makePrimary = function(id){
    console.log(id);
    privilegeFact2.makePrimary($scope.restroid, id, function(response){
      if(response){
        window.location.reload();
      }else{
        alert('somthing went wrong! Please Try again');
      }
    })
  }
  $scope.zonelist = [];
  $scope.delzone = [
      {"name": "Gurgaon", "id": "1"},
      {"name": "Noida", "id": "2"},
      {"name": "South Delhi", "id": "3"},
      {"name": "North Delhi", "id": "4"},
      {"name": "East Delhi", "id": "5"},
      {"name": "West Delhi", "id": "6"},
      {"name": "Central Delhi", "id": "7"}
    ];

  $scope.mumbzone = [
      {"name": "Western Suburbs", "id": "8"},
      {"name": "Eastern Suburbs", "id": "9"},
      {"name": "Harbour Suburbs", "id": "10"},
      {"name": "South Mumbai", "id": "11"}
    ];

  $scope.selectCityChange = function(){
    if($scope.outlet.cityid == "1"){
      $scope.zonelist = $scope.delzone;
      $http.get('scripts/controllers/delhiarea.js').success(function(data) {
       $scope.arealist = data;
      });
    }else if($scope.outlet.cityid == "2"){
      $scope.zonelist = $scope.mumbzone;
      console.log($scope.zonelist);
      $http.get('scripts/controllers/mumbaiarea.js').success(function(data) {
       $scope.arealist = data;
      });
    }
  }

      
	// create Restro
    $scope.updateRestro = function(){
    	//console.log($scope.restroData);
      $scope.updateBtnRestro = true;
      if(!$scope.restroData.name || $scope.restroData.name == ""){
        alert("name is required");
        $scope.updateBtnRestro = false;
        return;
      }
      if(!$scope.restroData.one_liner || $scope.restroData.one_liner == ""){
        alert("oneliner is required");
        $scope.updateBtnRestro = false;
        return;
      }
      if(!$scope.restroData.cost || $scope.restroData.cost == ""){
        alert("cost is required");
        $scope.updateBtnRestro = false;
        return;
      }
      if(!$scope.cover || $scope.cover == ""){
        $scope.cover = $scope.restroData.card_image;
      }
      privilegeFact2.updateRestro($scope.restroData.id, $scope.restroData.name, $scope.restroData.one_liner, $scope.restroData.cost, $scope.cover, function(response){
        if(response){
    				window.location.reload();
    			}else{
    				alert("oops somthing went wrong try again");
            $scope.updateBtnRestro = false;
    			}
      })
    }
    // end

    // delete cusine
    $scope.deletecusine = function(){
      var retVal = confirm("Do you want to delete this item ?");
       if( retVal == true ){
         privilegeFact2.deletecusine($scope.restroid, $scope.deletedCusine, function(response){
          if(response){
              window.location.reload();
            }else{
              alert("oops somthing went wrong try again");
            }
        });
       }
       else{
          return false;
       }
    }
    // end

    // create Outlet
    $scope.createOutlet = function(){

      $scope.createBtnOutlet = true;
    	if(!$scope.outlet.name || $scope.outlet.name == "" || !$scope.outlet.phone || $scope.outlet.phone == ""
    		|| !$scope.outlet.address || $scope.outlet.address == "" || !$scope.outlet.cityid ||
    		$scope.outlet.cityid == "" || !$scope.outlet.zoneid || $scope.outlet.zoneid == "" ||
    		!$scope.outlet.area || $scope.outlet.area == "" || !$scope.outlet.postcode ||
    		$scope.outlet.postcode == "" || !$scope.outlet.dishes || $scope.outlet.dishes == "" ||
    		!$scope.outlet.work_hours || $scope.outlet.work_hours == "" ||  $scope.outlet.latitude == "" || !$scope.outlet.latitude ||
        !$scope.outlet.longitude || $scope.outlet.longitude == ""){
    		alert("fields can't be empty");
        $scope.createBtnOutlet = false;
    		return;
    	}
      if(!$scope.outlet.email){
        alert('email values are invalid or empty please check and try again');
        $scope.createBtnOutlet = false;
        return;
      }
    	privilegeFact2.createOutlet($scope.outlet.name, $scope.outlet.phone, $scope.outlet.address, 
		$scope.outlet.cityid, $scope.outlet.zoneid, $scope.outlet.area, 
		$scope.outlet.postcode, $scope.outlet.dishes ,$scope.restroid,
		$scope.outlet.work_hours , $scope.outlet.latitude, $scope.outlet.longitude,$scope.outlet.email, function(response){
			if(response){
    				window.location.reload();
    			}else{
    				alert("oops somthing went wrong try again");
            $scope.createBtnOutlet = false;
    			}
		})
    }
    // end

    // delete outlet
    // $scope.deleteoutlet = function(id){
    //   var retVal = confirm("Do you want to delete this item ?");
    //    if( retVal == true ){
    //      privilegeFact2.deleteoutlet(id, function(response){
    //         if(response){
    //             window.location.reload();
    //           }else{
    //             alert("oops somthing went wrong try again");
    //           }
    //       })
    //    }
    //    else{
    //       return false;
    //    }
    // }
    // end
    $scope.updateOutletStatus = function(id, status){
      if(status == "0"){
        status = '1';
      }else if(status == '1'){
        status = '0';
      }
      privilegeFact2.updateOutletStatus(id, status, function(response){
        if(response){
              window.location.reload();
            }else{
              alert("oops somthing went wrong try again");
            }
      })
    }




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
	
	$scope.logout = function(){
		authFactory.logout(function(response) {
		 
		});
	}
}]);



app.factory('privilegeFact2', ['$http', function($http){
	var prvlg = {};

	prvlg.getrestrodata = function(id,callback){
		$http({
			method: 'GET',
			url: 'http://api.foodtalk.in/privilege/restaurant/'+id
		}).then(function (response) {
            callback(response);
        });
	}

	prvlg.updateRestro = function(id,name, one_liner, cost, card_image, callback){
	    $http({
	      method: 'PUT',
	      url: 'http://api.foodtalk.in/privilege/restaurant/'+id,
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

  prvlg.getcusine = function(callback){
    $http({
      method: 'GET',
      url: 'http://api.foodtalk.in/privilege/cuisine'
    }).then(function (response) {
            callback(response);
        });
  }

  prvlg.addcusine = function(id,cuisines, callback){
    $http({
      method: 'POST',
      url: 'http://api.foodtalk.in/privilege/restaurant/'+id+'/cuisine',
      data: {
        'cuisines' : cuisines
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

  prvlg.deletecusine = function(Restroid, cuisineId, callback){
    $http({
      method: 'DELETE',
      url: 'http://api.foodtalk.in/privilege/restaurant/'+Restroid+'/cuisine/'+cuisineId
    }).then(function (response) {
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
	prvlg.createOutlet = function(name, phone, address, 
		city_id, city_zone_id, area, postcode, suggested_dishes,resturant_id,
		work_hours,latitude,longitude,email, callback){
		$http({
	      method: 'POST',
	      url: 'http://api.foodtalk.in/privilege/outlet',
	      data : {
	        'name' : name,
	        'phone' : phone,
	        'address' : address,
	        'city_id' : city_id,
	        'city_zone_id' : city_zone_id,
	        'area' : area,
	        'postcode' : postcode,
	        'suggested_dishes' : suggested_dishes,
	        'resturant_id' : resturant_id,
	        'work_hours' : work_hours,
          'latitude': latitude,
          'longitude':longitude,
          'email': email
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

  // prvlg.deleteoutlet = function(id, callback){
  //   $http({
  //     method: 'DELETE',
  //     url: 'http://api.foodtalk.in/privilege/outlet/'+id
  //   }).then(function (response) {
  //       if(response.data.code === "202"){
  //           callback(true);
  //           //console.log(response);
  //       }else{
  //         //Create an error Box and display the 
  //         alert('something went wrong please try again after refreshing the page');
  //         //console.log(response);
  //         callback(false);
  //       }
  //   });
  // }

  prvlg.updateOutletStatus = function(id, active, callback){
      $http({
        method: 'PUT',
        url: 'http://api.foodtalk.in/privilege/outlet/'+id,
        data : {
          'is_disabled' : active
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
  prvlg.makePrimary = function(id, cusine, callback){
      $http({
        method: 'PUT',
        url: 'http://api.foodtalk.in/privilege/restaurant/'+id,
        data : {
          'primary_cuisine' : cusine
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