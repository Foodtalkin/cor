app.controller('offersopenCtrl', ['$scope','$rootScope','$location','authFactory','$routeParams', 'offerFactory', 'Upload', 'cloudinary', function($scope, $rootScope,$location,authFactory,$routeParams, offerFactory, $upload, cloudinary){
	$scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
   $scope.offerdetails = {};
   $scope.store2 = {};
   // $scope.loader = true;
   var offerid = $routeParams.offerid;
    offerFactory.getOfferDetails(offerid,function(response){
        if(response){
          $scope.offerdetails = response.data.storeOffer;
          $scope.userClaims = response.data.clamedUsers;
          console.log(response);
        }else{
          console.log("Le wild error");
        }
      });
    

    var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    //$scope.$watch('files', function() {
    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
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
            $scope.store2.cover = file.result.url;
            console.log($scope.store2.cover);
            $rootScope.photos.push(data);
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    //});


    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    //$scope.$watch('files', function() {
    $scope.uploadFiles2 = function(files2){
      $scope.files2 = files2;
      if (!$scope.files2) return;
      angular.forEach(files2, function(file){
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
            $scope.store2.cardcover = file.result.url;
            
            $rootScope.photos.push(data);
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    //});

    /* Modify the look and fill of the dropzone when files are being dragged over it */
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


    $scope.editoffer = function(){
      if(!$scope.offerdetails.title && !$scope.offerdetails.cardActionButtonText && !$scope.offerdetails.actionButtonText && !$scope.offerdetails.description && !$scope.offerdetails.shortDescription && !$scope.offerdetails.termConditionsLink && !$scope.offerdetails.thankYouText && !$scope.offerdetails.startDate && !$scope.offerdetails.endDate && !$scope.offerdetails.cityText){
        alert('all fields are required, please check your form and try again');
        return;
      }
      if(!$scope.store2.cardcover){
        $scope.store2.cardcover = $scope.offerdetails.cardImage;
        console.log($scope.store2.cardcover);
      }
      
      if(!$scope.store2.cover){
        $scope.store2.cover = $scope.offerdetails.coverImage;
        console.log($scope.store2.cover);
      }
      offerFactory.updateOffer($scope.offerdetails.id,$scope.offerdetails.title,
      $scope.offerdetails.cardActionButtonText,$scope.offerdetails.actionButtonText,
      $scope.offerdetails.description,$scope.offerdetails.shortDescription,
      $scope.offerdetails.termConditionsLink,$scope.offerdetails.thankYouText,
      $scope.offerdetails.startDate,$scope.offerdetails.endDate,$scope.offerdetails.cityText,
      $scope.store2.cardcover,$scope.store2.cover,function(response){
        if(response){
          window.location.reload();
          console.log(response);
        }else{
          console.log("Le wild error");
        }
      })
    }

    $scope.toggelactive = function(activity){
      console.log($scope.offerdetails.isDisabled);
      if(activity == '0'){
        activity = '1';
      }else{
        activity = '0';
      }
      //activity = !activity;
      console.log(activity);
      $scope.avtiveoffer(activity);
    };
    
    $scope.avtiveoffer = function (activity) {
      offerFactory.activeOffer(offerid,activity, function(response){
        if(response){
          window.location.reload();
        }else{
          console.log("Le wild error");
        }
      })
    }
   $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }
}]);