app.controller('offersCtrl', ['$scope','$rootScope','$location','authFactory','$routeParams', 'Upload', 'cloudinary','offerFactory', function($scope, $rootScope,$location,authFactory,$routeParams, $upload, cloudinary, offerFactory){
	$scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
   //$scope.onlineOfflene = 'offline';
   // $scope.loader = true;
   $scope.store = {};
   $scope.hidesingle = false;
   
   $scope.store.methodofpayment = "";
   $scope.store.subtype = "";
   $scope.curruntpage = 1;
   $scope.reedeem = {};
   $scope.reedeem.title = "Url / phone number";
  $scope.reedeem.type = "text";
  $scope.reedeem.Helptext = "Url /phone number where user can reedeem this offer";
   if($scope.curruntpage == 1){
    $scope.prevshow = false;
   }else{
    $scope.prevshow = true;
   }

    offerFactory.getallOffer($scope.curruntpage,function(response){
        $scope.offers = response.data.storeOffers;
        console.log(response.data.storeOffers);
      });

    $scope.getofferpage = function(page){
      //console.log(page);
      
      offerFactory.getallOffer(page,function(response){
        var temp = response.data.storeOffers;
          //console.log(temp.length);
        if(temp.length !== 0){
          $scope.offers = response.data.storeOffers;
          $scope.curruntpage = page;
          if($scope.curruntpage == 1){
            $scope.prevshow = false;
           }else{
            $scope.prevshow = true;
           }
        }else{
          alert('no data to show :(');
        }
      });
    }
   var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    //$scope.$watch('files', function() {
    $scope.uploadFiles = function(files){
      console.log(files);
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
            $scope.store.cover = file.result.url;
            //console.log($scope.store.cover);
            $rootScope.photos.push(data);
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };
    //});

    $scope.checkLive = function(sdate, edate, active){

      var date = new Date();
      var start = new Date(sdate);
      var end = new Date(edate);
      if(start <= date && date <= end){
        if(active == '0'){
            return 'online';
          }else{
            return 'offline';
          }
      }else{
        return 'offline';
      }
      
    }

    

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
            $scope.store.cardcover = file.result.url;
            
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

    $scope.reedeemchange = function(){
      if($scope.store.methodofreedeem == "LINK"){
        $scope.reedeem.title = "Url";
        $scope.reedeem.type = "url";
        $scope.reedeem.Helptext = "Url where user can reedeem this offer";
      }else if($scope.store.methodofreedeem == "PHONE"){
        $scope.reedeem.title = "Phone Number";
        $scope.reedeem.type = "tel";
        $scope.reedeem.Helptext = "Phone number to order from where user can reedeem this offer";
      }
    }

    $scope.typechange = function(){
      if($scope.store.type == "DINE-IN"){
        $scope.hidesingle = true;
      }else{
        $scope.hidesingle = false;
      }
    }

    $scope.createOffer = function(){
      console.log();
      if(!$scope.store.name || !$scope.store.cardbtn || !$scope.store.formbtn || !$scope.store.longdesc || !$scope.store.shortdesc || !$scope.store.couponno || !$scope.store.terms || !$scope.store.thankyoutext || !$scope.store.sdate || !$scope.store.edate || !$scope.store.validtill ||  !$scope.store.city || !$scope.store.reedeemdata){
        alert('all fields are required, please check your form and try again');
        return;
      }
      if($scope.store.methodofreedeem == "LINK"){
        $scope.store.redirecturl = $scope.store.reedeemdata;
        $scope.store.redirectphone = "";
        console.log($scope.store.reedeemdata);
      }else if($scope.store.methodofreedeem == "PHONE"){
        $scope.store.redirecturl = "";
          $scope.store.redirectphone = $scope.store.reedeemdata;
          console.log($scope.store.reedeemdata);
      }else{
        console.log($scope.store.reedeemdata);
        alert('Method of Reedeeming cannot be empty');
        return;
      }

      if($scope.store.methodofpayment == ""){
        alert('Method of payment cannot be empty');
        return;
      }
      
      if($scope.store.subtype == ""){
        alert('Offer Sub Type cannot be empty');
        return;
      }

      



      if(!$scope.store.cardcover || !$scope.store.cover){
        if(!$scope.store.cardcover){
          alert('No Card Image, Please upload the image again');
        }
        if(!$scope.store.cover){
          alert('No Cover Image, Please upload the image again');
        }
        return;
      }
      
      if($scope.store.subtype == "SINGLE_CODE"){
        offerFactory.createsinglecodeOffer($scope.store.type,$scope.store.name,
          $scope.store.cover,
          $scope.store.cardcover,
          $scope.store.cardbtn,
          $scope.store.formbtn,
          $scope.store.longdesc,
          $scope.store.shortdesc,
          $scope.store.methodofpayment,
          // $scope.store.amountcost,
          $scope.store.pointcost,
          $scope.store.terms,
          $scope.store.thankyoutext,
          $scope.store.sdate,
          $scope.store.edate,
          $scope.store.validtill,
          $scope.store.couponno,
          $scope.store.couponcode,
          $scope.store.subtype,
          $scope.store.redirecturl,
          $scope.store.city,
          $scope.store.redirectphone,
          '1',
          // $scope.store.paymenturl, 
          function(response){
          if(response){
            window.location.reload();
          }else{
              console.log("Le wild error");

          }
        });
      }else{
        if($scope.store.autogen == true){
          $scope.store.autogen = "1";
        }else{
          $scope.store.autogen = "0";
        }
        
        if($scope.store.couponcode){
          var codestring = $scope.store.couponcode.split(" ");
            codestring = codestring.join("");
            $scope.codes = codestring.split(",");
        }
        offerFactory.createuniquecodeOffer($scope.store.type,$scope.store.name,
          $scope.store.cover,
          $scope.store.cardcover,
          $scope.store.cardbtn,
          $scope.store.formbtn,
          $scope.store.longdesc,
          $scope.store.shortdesc,
          $scope.store.methodofpayment,
          // $scope.store.amountcost,
          $scope.store.pointcost,
          $scope.store.terms,
          $scope.store.thankyoutext,
          $scope.store.sdate,
          $scope.store.edate,
          $scope.store.validtill,
          $scope.store.couponno,
          $scope.store.subtype,
          $scope.store.redirecturl,
          $scope.store.city,
          $scope.store.redirectphone,
          '1',
          $scope.store.autogen
          // $scope.store.paymenturl
          ).then(function (response) {
              //console.log(response.storeOfferId);
             $scope.storeOfferId = response.storeOfferId;
             if($scope.store.autogen == "1"){
               window.location.reload();
             }else{
                $scope.couponcode();
             }
             
          }, function (err) {
             console.log(err);
          })
      }
    }

    $scope.couponcode = function(){
      offerFactory.adduniquecode($scope.storeOfferId,$scope.codes,function(response){
          if(response){
            //console.log(response);
            window.location.reload();
          }else{

            console.log("Le wild error");
          }
        })
    }
    
    // $scope.checkdate = function(disable, enddate){
    //   //offer.isDisabled == '0'
    //   var today = new Date();
    //   var dd = today.getDate();
    //   var mm = today.getMonth()+1; //January is 0!
    //   var yyyy = today.getFullYear();
    //   if(dd<10) {
    //       dd='0'+dd
    //   } 
    //   if(mm<10) {
    //       mm='0'+mm
    //   } 

    //   today = yyyy+'-'+mm+'-'+dd;
    //   console.log(today);
    //   console.log(enddate);
    //   return true;
    // }
   
   $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }
}]);