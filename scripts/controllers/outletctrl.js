app.controller('outletCtrl', ['$scope', '$rootScope','$location','Upload', 'cloudinary','outletFact','$routeParams','$http','authFactory',
 function($scope,$rootScope,$location,$upload, cloudinary,outletFact,$routeParams,$http,authFactory){
	$scope.username = $rootScope.username;
	$scope.email =$rootScope.useremail;

	$scope.outletoffer = {};
	$scope.outletdata = {};
  $scope.outletImageData = [];
  $scope.imageList = {};
	$scope.outletid= $routeParams.outletid;
	outletFact.getoutletdata($scope.outletid, function(response){
		$scope.outletdata = response.data.result;
    console.log($scope.outletdata);
    $scope.selectCityChange();
	});


	outletFact.getofferList(function(response){
		$scope.offerList = response.data.result;
	});

  
  $scope.getOutletImages = function(){
    outletFact.getOutletImages($scope.outletid, function(response){
      console.log(response);
      $scope.imageList = response.data.result;
    });
  }
  $scope.getOutletImages();

  $scope.deleteImage = function(imgid){
    var retVal = confirm("Do you want to delete this image ?");
     if( retVal == true ){
       outletFact.deleteImage(imgid,$scope.outletid, function(response){
          if(response){
              //window.location.reload();
              $scope.getOutletImages();
            }else{
              alert("oops somthing went wrong try again");
            }
        })
     }
     else{
        return false;
     }
  }

  $scope.updateofferStatus = function(id, status){
      if(status == "0"){
        status = '1';
      }else if(status == '1'){
        status = '0';
      }
      outletFact.updateofferStatus(id, status, function(response){
        if(response){
              window.location.reload();
            }else{
              alert("oops somthing went wrong try again");
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
    if($scope.outletdata.city_id == "1"){
      $scope.zonelist = $scope.delzone;
      $http.get('scripts/controllers/delhiarea.js').success(function(data) {
       $scope.arealist = data;
      });
    }else if($scope.outletdata.city_id == "2"){
      $scope.zonelist = $scope.mumbzone;
      $http.get('scripts/controllers/mumbaiarea.js').success(function(data) {
       $scope.arealist = data;
      });
    }
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
            console.log($rootScope.photos);
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

  
	// update Outlet
    $scope.updateOutlet = function(){
      $scope.updateBtnOutlet = true;
    	if(!$scope.outletdata.name || $scope.outletdata.name == "" || !$scope.outletdata.phone || $scope.outletdata.phone == ""
    		|| !$scope.outletdata.address || $scope.outletdata.address == "" || !$scope.outletdata.city_id ||
    		$scope.outletdata.city_id == "" || !$scope.outletdata.city_zone_id || $scope.outletdata.city_zone_id == "" ||
    		!$scope.outletdata.area || $scope.outletdata.area == "" || !$scope.outletdata.postcode ||
    		$scope.outletdata.postcode == "" || !$scope.outletdata.suggested_dishes || $scope.outletdata.suggested_dishes == "" ||
    		!$scope.outletdata.work_hours || $scope.outletdata.work_hours == "" || $scope.outletdata.latitude == "" || !$scope.outletdata.latitude ||
        !$scope.outletdata.longitude || $scope.outletdata.longitude == ""){
    		alert("fields can't be empty");
        $scope.updateBtnOutlet = false;
    		return;
    	}
      if(!$scope.outletdata.email){
         alert('email values are invalid or empty please check and try again');
        $scope.updateBtnOutlet = false;
        return;
      }
    	outletFact.updateOutlet($scope.outletid, $scope.outletdata.name, $scope.outletdata.phone, $scope.outletdata.address, 
		$scope.outletdata.city_id, $scope.outletdata.city_zone_id, $scope.outletdata.area, 
		$scope.outletdata.postcode, $scope.outletdata.suggested_dishes ,$scope.restroid,
		$scope.outletdata.work_hours , $scope.outletdata.latitude, $scope.outletdata.longitude,$scope.outletdata.email, function(response){
			if(response){
    				window.location.reload();
    			}else{
    				alert("oops somthing went wrong try again");
            $scope.updateBtnOutlet = false;
    			}
		})
    }
    // end

    // delete outlet
    $scope.deleteoffer = function(id){
      var retVal = confirm("Do you want to delete this item ?");
       if( retVal == true ){
         outletFact.deleteoffer(id, function(response){
            if(response){
                //window.location.reload();
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

    // create oulet offer
    $scope.createOutletOffer = function(){
      $scope.creatOfferBtnOutlet = true;
    	if(!$scope.outletoffer.offer_id || $scope.outletoffer.offer_id == "" || 
    		!$scope.cover || $scope.cover == "" ||
    		!$scope.outletoffer.short_description || $scope.outletoffer.short_description == "" ||
    		!$scope.outletoffer.start_date || $scope.outletoffer.start_date == "" ||
    		!$scope.outletoffer.end_date || $scope.outletoffer.end_date == "" ||
        !$scope.outletoffer.description || $scope.outletoffer.description == ""){
    		alert("fields can't be empty");
        $scope.creatOfferBtnOutlet = false;
    		return;
    	}
    	outletFact.createOutletOffer($scope.outletid, $scope.outletoffer.offer_id, 
    		$scope.cover, $scope.outletoffer.short_description,
    		$scope.outletoffer.start_date, $scope.outletoffer.end_date,$scope.outletoffer.description, function(response){
    			if(response){
    				window.location.reload();
    				$scope.cover = "";
    			}else{
    				alert("oops somthing went wrong try again");
            $scope.creatOfferBtnOutlet = false;
    			}
    		})
    }
    // end

    $scope.createNewOffer = function(){
    	if(!$scope.newOffer.title || $scope.newOffer.title == "" ||
    		!$scope.newOffer.short_description || $scope.newOffer.short_description == "" ||
    		!$scope.newOffer.term_conditions_link || $scope.newOffer.term_conditions_link == ""){
    		alert("fields can't be empty");
    		return;
    	}
    	outletFact.createNewOffer($scope.newOffer.title, $scope.newOffer.short_description,
    		$scope.newOffer.term_conditions_link, function(response){
    			if(response){
    				window.location.reload();
    				$scope.cover = "";
    			}else{
    				alert("oops somthing went wrong try again");
    			}
    		})

    }

    // create oulet offer
    $scope.updateOutletOffer = function(){
      $scope.updateOfferBtnOutlet = true;
    	if(!$scope.editoutletoffer.offer_id || $scope.editoutletoffer.offer_id == "" || 
    		!$scope.editoutletoffer.short_description || $scope.editoutletoffer.short_description == "" ||
    		!$scope.editoutletoffer.start_date || $scope.editoutletoffer.start_date == "" ||
    		!$scope.editoutletoffer.end_date || $scope.editoutletoffer.end_date == ""  ||
        !$scope.editoutletoffer.description || $scope.editoutletoffer.description == ""){
    		alert("fields can't be empty");
        $scope.updateOfferBtnOutlet = false;
    		return;

    	}
    	if(!$scope.cover || $scope.cover == ""){
    		$scope.cover = $scope.editoutletoffer.cover_image;
    	}
    	outletFact.updateOutletOffer($scope.editoutletoffer.id, 
    		$scope.cover, $scope.editoutletoffer.short_description,
    		$scope.editoutletoffer.start_date, $scope.editoutletoffer.end_date,$scope.editoutletoffer.description, function(response){
    			if(response){
    				window.location.reload();
    				$scope.cover = "";
    			}else{
    				alert("oops somthing went wrong try again");
            $scope.updateOfferBtnOutlet = false;
    			}
    		})
    }
    // end

    $scope.editoutletofferfun = function(id){
    	outletFact.getoutletofferdata(id, function(response){
    		$scope.editoutletoffer = response.data.result;
        $scope.updateoutletoffer = true;
    	})
    }


    

    // $scope.outletimgaddarray = function(url, type){
    //   var myobj = {
    //   "url": url,
    //   "type": type
    // };
    //   $scope.outletImageData.push(myobj);
    //   console.log($scope.outletImageData);
    // }

    $scope.saveImagesToOutlet = function(){
      $scope.saveImgBtnOutlet = true;
      if($rootScope.photos.length != 0){
        $scope.outletimages = $rootScope.photos;
        //console.log($scope.outletimages);
        angular.forEach($scope.outletimages, function(data) {
          var myobj = {
            "url": data.url,
            "type": "photo"
          };
          $scope.outletImageData.push(myobj);
        });
      }else{
        alert('no images');
        $scope.saveImgBtnOutlet = false;
      }
      outletFact.saveImagesToOutlet($scope.outletid, $scope.outletImageData, function(response){
        if(response){
            window.location.reload();
            $scope.cover = "";
          }else{
            alert("oops somthing went wrong try again");
            $scope.saveImgBtnOutlet = false;
          }
      })
    }
	
	$scope.logout = function(){
		authFactory.logout(function(response) {
		 
		});
	}
}]);



app.factory('outletFact', ['$http', function($http){
	var prvlg = {};

	prvlg.getoutletdata = function(id,callback){
		$http({
			method: 'GET',
			url: 'http://api.foodtalk.in/privilege/outlet/'+id
		}).then(function (response) {
            callback(response);
        });
	}
	prvlg.getofferList = function(callback){
		$http({
			method: 'GET',
			url: 'http://api.foodtalk.in/privilege/offer'
		}).then(function (response) {
            callback(response);
        });
	}

  prvlg.getOutletImages = function(id,callback){
    $http({
      method: 'GET',
      url: 'http://api.foodtalk.in/privilege/outlet/'+id+'/image'
    }).then(function (response) {
            callback(response);
        });
  }

	prvlg.getoutletofferdata = function(id,callback){
		$http({
			method: 'GET',
			url: 'http://api.foodtalk.in/privilege/outlet-offer/'+id
		}).then(function (response) {
            callback(response);
        });
	}

	prvlg.createOutletOffer = function(outlet_id, offer_id, cover_image, short_description,start_date, end_date,description, callback){
		$http({
	      method: 'POST',
	      url: 'http://api.foodtalk.in/privilege/outlet-offer',
	      data : {
	        'outlet_id' : outlet_id,
	        'offer_id' : offer_id,
	        'cover_image' : cover_image,
	        'short_description' : short_description,
	        'start_date' : start_date,
	        'end_date' : end_date,
          'description' :description
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

	prvlg.createNewOffer = function(title, short_description, term_conditions_link, callback){
		$http({
	      method: 'POST',
	      url: 'http://api.foodtalk.in/privilege/offer',
	      data : {
	        'title' : title,
	        'short_description' : short_description,
	        'term_conditions_link' : term_conditions_link
	      }
	    }).then(function (response) {
	        console.log(response);
	        if(response.data.code === "200"){
	            callback(true);
	            console.log(response);
	        }else{
	          //Create an error Box and display the 
	          alert('something went wrong please try again after refreshing the page');
	          console.log(response);
	          callback(false);
	        }
		});
	}

  prvlg.saveImagesToOutlet = function(id, data, callback){
    $http({
        method: 'POST',
        url: 'http://api.foodtalk.in/privilege/outlet/'+id+'/image',
        data : { "images" : data}
      }).then(function (response) {
          console.log(response);
          if(response.data.code === "200"){
              callback(true);
              console.log(response);
          }else{
            //Create an error Box and display the 
            alert('something went wrong please try again after refreshing the page');
            console.log(response);
            callback(false);
          }
    });
  }

	prvlg.updateOutletOffer = function(id, cover_image, short_description, start_date, end_date,description, callback){
		$http({
	      method: 'PUT',
	      url: 'http://api.foodtalk.in/privilege/outlet-offer/'+id,
	      data : {
	        'cover_image' : cover_image,
	        'short_description' : short_description,
	        'start_date' : start_date,
	        'end_date' : end_date,
          'description' : description
	      }
	    }).then(function (response) {
	        if(response.data.code === "200"){
	            callback(true);
	            console.log(response);
	        }else{
	          //Create an error Box and display the 
	          alert('something went wrong please try again after refreshing the page');
	          console.log(response);
	          callback(false);
	        }
		});
	}
  prvlg.updateofferStatus = function(id, active, callback){
      $http({
        method: 'PUT',
        url: 'http://api.foodtalk.in/privilege/outlet-offer/'+id,
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
	prvlg.updateOutlet = function(id, name, phone, address, 
		city_id, city_zone_id, area, postcode, suggested_dishes,resturant_id,
		work_hours,latitude,longitude,email, callback){
		$http({
	      method: 'PUT',
	      url: 'http://api.foodtalk.in/privilege/outlet/'+id,
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
	        console.log(response);
	        if(response.data.code === "200"){
	            callback(true);
	            console.log(response);
	        }else{
	          //Create an error Box and display the 
	          alert('something went wrong please try again after refreshing the page');
	          console.log(response);
	          callback(false);
	        }
		});
	}

  prvlg.deleteoffer = function(id, callback){
    $http({
      method: 'DELETE',
      url: 'http://api.foodtalk.in/privilege/outlet-offer/'+id
    }).then(function (response) {
        if(response.data.code === "200"){
            callback(true);
            console.log(response);
        }else{
          //Create an error Box and display the 
          alert('something went wrong please try again after refreshing the page');
          console.log(response);
          callback(false);
        }
    });
  }

  prvlg.deleteImage = function(id,outletid, callback){
    $http({
      method: 'DELETE',
      url: 'http://api.foodtalk.in/privilege/outlet/'+ outletid +'/image/'+id
    }).then(function (response) {
        if(response.data.code === "202"){
            callback(true);
            console.log(response);
        }else{
          //Create an error Box and display the 
          alert('something went wrong please try again after refreshing the page');
          console.log(response);
          callback(false);
        }
    });
  }
	return prvlg;
}])