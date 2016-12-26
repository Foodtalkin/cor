app.controller('newsCtrl', ['$scope','$rootScope','$location','authFactory','$routeParams', 'Upload', 'cloudinary','newsFactory', function($scope, $rootScope,$location,authFactory,$routeParams, $upload, cloudinary, newsFactory){
	$scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
   // $scope.loader = true;
   $scope.news = {};
   $scope.newslist = {};

   newsFactory.getallnews(function(response){
      
      $scope.newslist = response.data.news;
      console.log($scope.newslist);
    });

  
  $scope.activeNews = function(id, active){
      
      if(active == '0'){
        active = '1';
      }else if(active == '1'){
        active = '0';
      }
      console.log(active);
      newsFactory.activeNews(id, active, function(response){
        if(response){
            window.location.reload();
            console.log("done");

        }else{
            console.log("Le wild error");
        }
      })
    }


    $scope.openeditnews = function(news){
      $scope.formeditshow = !$scope.formeditshow;
      $scope.newstoedit = news;
    }

    $scope.editnews = function(){
      newsFactory.editNews($scope.newstoedit.id, $scope.newstoedit.title, $scope.newstoedit.description, $scope.newstoedit.source, $scope.newstoedit.sourceUrl, function(response){
        if(response){
          window.location.reload();
        }else{
            console.log("Le wild error");
        }
      });
    }


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
            $scope.news.cover = file.result.url;
            $rootScope.photos.push(data);
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    //});

    $scope.createNews= function(){
      console.log($scope.news.cover);
      newsFactory.createNews($scope.news.title, $scope.news.cover, $scope.news.text, $scope.news.source, $scope.news.sourceUrl, function(response){
        if(response){
          window.location.reload();
        }else{
            console.log("Le wild error");
        }
      });
    }

    
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


    
   
   $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }
}]);