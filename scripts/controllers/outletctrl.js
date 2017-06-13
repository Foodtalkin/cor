app.controller('outletCtrl', ['$scope', '$rootScope','$location','Upload', 'cloudinary','outletFact','$routeParams',
 function($scope,$rootScope,$location,$upload, cloudinary,outletFact,$routeParams, ){
	$scope.username = $rootScope.username;
	$scope.email =$rootScope.useremail;

	$scope.outletoffer = {};
	$scope.outletdata = {};
  $scope.outletImageData = [];
	$scope.outletid= $routeParams.outletid;
	outletFact.getoutletdata($scope.outletid, function(response){
		$scope.outletdata = response.data.result;
    console.log($scope.outletdata)
	});


	outletFact.getofferList(function(response){
		$scope.offerList = response.data.result;
	})

  // crop code start
  
    $scope.fileChanged = function(e) {      
    
      var files = e.target.files;
    
        var fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);   
      
      fileReader.onload = function(e) {
        $scope.imgSrc = this.result;
        $scope.$apply();
      };
      
    }   
     
    $scope.clear = function() {
       $scope.imageCropStep = 1;
       delete $scope.imgSrc;
       delete $scope.result;
       delete $scope.resultBlob;
    }; 

    $scope.cropWidth = "640";
    $scope.cropheight = "340";
     

    $scope.uploadC = function(){

      var blob = new Blob([$scope.result], {type: 'image/png'});
      var file = new File([$scope.resultBlob], 'imageFileName.png');
      var files = [file];
      console.log(files);
      $scope.uploadFiles(files);
    }


    // crop code end

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
    	if(!$scope.outletdata.name || $scope.outletdata.name == "" || !$scope.outletdata.phone || $scope.outletdata.phone == ""
    		|| !$scope.outletdata.address || $scope.outletdata.address == "" || !$scope.outletdata.city_id ||
    		$scope.outletdata.city_id == "" || !$scope.outletdata.city_zone_id || $scope.outletdata.city_zone_id == "" ||
    		!$scope.outletdata.area || $scope.outletdata.area == "" || !$scope.outletdata.postcode ||
    		$scope.outletdata.postcode == "" || !$scope.outletdata.suggested_dishes || $scope.outletdata.suggested_dishes == "" ||
    		!$scope.outletdata.work_hours || $scope.outletdata.work_hours == "" || !$scope.outletdata.pin ||
    		$scope.outletdata.pin == ""){
    		alert("fields can't be empty");
    		return;
    	}
    	outletFact.updateOutlet($scope.outletid, $scope.outletdata.name, $scope.outletdata.phone, $scope.outletdata.address, 
		$scope.outletdata.city_id, $scope.outletdata.city_zone_id, $scope.outletdata.area, 
		$scope.outletdata.postcode, $scope.outletdata.suggested_dishes ,$scope.restroid,
		$scope.outletdata.work_hours ,$scope.outletdata.pin,function(response){
			if(response){
    				window.location.reload();
    			}else{
    				alert("oops somthing went wrong try again");
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
    	if(!$scope.outletoffer.offer_id || $scope.outletoffer.offer_id == "" || 
    		!$scope.cover || $scope.cover == "" ||
    		!$scope.outletoffer.short_description || $scope.outletoffer.short_description == "" ||
    		!$scope.outletoffer.start_date || $scope.outletoffer.start_date == "" ||
    		!$scope.outletoffer.end_date || $scope.outletoffer.end_date == "" ||
        !$scope.outletoffer.description || $scope.outletoffer.description == ""){
    		alert("fields can't be empty");
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
    	if(!$scope.editoutletoffer.offer_id || $scope.editoutletoffer.offer_id == "" || 
    		!$scope.editoutletoffer.short_description || $scope.editoutletoffer.short_description == "" ||
    		!$scope.editoutletoffer.start_date || $scope.editoutletoffer.start_date == "" ||
    		!$scope.editoutletoffer.end_date || $scope.editoutletoffer.end_date == ""  ||
        !$scope.editoutletoffer.description || $scope.editoutletoffer.description == ""){
    		alert("fields can't be empty");
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
      }
      outletFact.saveImagesToOutlet($scope.outletid, $scope.outletImageData, function(response){
        if(response){
            window.location.reload();
            $scope.cover = "";
          }else{
            alert("oops somthing went wrong try again");
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
			url: 'http://stg-api.foodtalk.in/outlet/'+id
		}).then(function (response) {
            callback(response);
        });
	}
	prvlg.getofferList = function(callback){
		$http({
			method: 'GET',
			url: 'http://stg-api.foodtalk.in/privilege/offer'
		}).then(function (response) {
            callback(response);
        });
	}

	prvlg.getoutletofferdata = function(id,callback){
		$http({
			method: 'GET',
			url: 'http://stg-api.foodtalk.in/privilege/outlet-offer/'+id
		}).then(function (response) {
            callback(response);
        });
	}

	prvlg.createOutletOffer = function(outlet_id, offer_id, cover_image, short_description,start_date, end_date,description, callback){
		$http({
	      method: 'POST',
	      url: 'http://stg-api.foodtalk.in/privilege/outlet-offer',
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

	prvlg.createNewOffer = function(title, short_description, term_conditions_link, callback){
		$http({
	      method: 'POST',
	      url: 'http://stg-api.foodtalk.in/privilege/offer',
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
        url: 'http://stg-api.foodtalk.in/privilege/outlet/'+id+'/image',
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
	      url: 'http://stg-api.foodtalk.in/privilege/outlet-offer/'+id,
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

	prvlg.updateOutlet = function(id, name, phone, address, 
		city_id, city_zone_id, area, postcode, suggested_dishes,resturant_id,
		work_hours,pin, callback){
		$http({
	      method: 'PUT',
	      url: 'http://stg-api.foodtalk.in/privilege/outlet/'+id,
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
	        'pin' : pin
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
      url: 'http://stg-api.foodtalk.in/privilege/outlet-offer/'+id
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
	return prvlg;
}])