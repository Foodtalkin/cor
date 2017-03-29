app.controller('offersCtrl', ['$scope','$rootScope','$location','authFactory','$routeParams', 'Upload', 'cloudinary','offerFactory', function($scope, $rootScope,$location,authFactory,$routeParams, $upload, cloudinary, offerFactory){
	$scope.username = $rootScope.username;
   $scope.email =$rootScope.useremail;
   //$scope.onlineOfflene = 'offline';
   // $scope.loader = true;
   $scope.store = {};
   $scope.hidesingle = false;
   $scope.restroList = [];
   $scope.slectedRestro = [];
   
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

    $scope.serchRestro = function(q_key){
      //console.log(q_key);
      offerFactory.getrestro(q_key,function(response){
        // console.log(response.data.result.hits.hits);
        $scope.restroList = response.data.result.hits.hits;
      })
    }

    $scope.addToList = function(id){
      $scope.slectedRestro.push(id);
      var myEl1 = angular.element(  document.querySelector( '#add'+id ) );
      myEl1.attr('disabled', 'disabled');
      myEl1.css('color', 'gray');
      var myEl2 = angular.element(  document.querySelector( '#remove'+id ) );
      myEl2.attr('disabled', false);
      myEl2.css('color', 'red');
      var myEl3 = angular.element(  document.querySelector( '#chck'+id ) );
      myEl3.css('opacity', 1);
    }
    $scope.removeFromList = function(id){
      var index = $scope.slectedRestro.indexOf(id);
      $scope.slectedRestro.splice(index, 1);
      var myEl1 = angular.element(  document.querySelector( '#remove'+id ) );
      myEl1.attr('disabled', 'disabled');
      myEl1.css('color', 'gray');
      var myEl2 = angular.element(  document.querySelector( '#add'+id ) );
      myEl2.attr('disabled', false);
      myEl2.css('color', 'blue');
      var myEl3 = angular.element(  document.querySelector( '#chck'+id ) );
      myEl3.css('opacity', 0);
    }

    

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
        $scope.store.autogen = true;
      }else{
        $scope.hidesingle = false;
        $scope.store.autogen = false;
      }
    }

    $scope.createOffer = function(){
      $scope.loader = true;
      // checking fields
      if(!$scope.store.name || !$scope.store.cardbtn || !$scope.store.formbtn || !$scope.store.longdesc || !$scope.store.shortdesc || !$scope.store.couponno || !$scope.store.terms || !$scope.store.thankyoutext || !$scope.store.sdate || !$scope.store.edate || !$scope.store.validtill ||  !$scope.store.city){
        alert('all fields are required, please check your form and try again');
        $scope.loader = false;
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
        $scope.store.methodofreedeem = "";
        $scope.store.redirecturl = "";
        $scope.store.redirectphone = "";
      }

      if($scope.store.methodofpayment == ""){
        alert('Method of payment cannot be empty');
        $scope.loader = false;
        return;
      }
      
      if($scope.store.subtype == ""){
        alert('Offer Sub Type cannot be empty');
        $scope.loader = false;
        return;
      }

      if(!$scope.store.cover){
          alert('No Cover Image, Please upload the image again');
          $scope.loader = false;
          return;
      }
      
      
      if($scope.store.subtype == "SINGLE_CODE"){
        offerFactory.createsinglecodeOffer($scope.store.type,$scope.store.name,
          $scope.store.cover,
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
            $scope.loader = false;
            window.location.reload();
            
          }else{
            $scope.loader = false;
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
                if($scope.store.type == "DINE-IN"){
                  $scope.addRestro();
                }else{
                  $scope.loader = false;
                  window.location.reload();
                }
               
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
            $scope.loader = false;
            window.location.reload();
          }else{
            $scope.loader = false;
            console.log("Le wild error");
          }
        })
    }

    $scope.addRestro = function(){
      offerFactory.addRestro($scope.storeOfferId, $scope.slectedRestro, function(response){
        if(response.data.status == "OK"){
          // console.log(response);
          $scope.loader = false;
          window.location.reload();
        }else{
          $scope.loader = false;
          console.log("Le wild error");
        }
      })
    }
    
    
   
  $scope.logout = function(){
    authFactory.logout(function(response) {
     
    });
  }
}]);