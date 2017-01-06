app.factory('offerFactory', ['$http','$q', function($http,$q){
	var offerFactory = {};

	offerFactory.createsinglecodeOffer = function(title,coverImage,cardImage,
		cardActionButtonText,actionButtonText,description,
		shortDescription,costType,costOnline,costPoints,
		termConditionsLink,thankYouText,
		startDate,endDate,validTill,totalQuantity,
		couponCode,subType,redemptionUrl,cityText,isDisabled,callback){
		$http({
			method: 'POST',
			url: 'http://52.74.136.146/index.php/service/storeOffer/add',
			data: {sessionId:"GUEST",
					title:title,
					coverImage:coverImage,
			 		cardImage:cardImage,
			 		cardActionButtonText:cardActionButtonText,
					actionButtonText:actionButtonText,
					description:description,
					shortDescription:shortDescription,
					costType:costType,
					costOnline:costOnline,
					costPoints:costPoints,
					termConditionsLink:termConditionsLink,
					thankYouText:thankYouText,
					startDate:startDate,
					endDate:endDate,
					validTill:validTill,
					totalQuantity:totalQuantity,
					couponCode:couponCode,
					subType:subType,
					redemptionUrl:redemptionUrl,
					cityText:cityText,
					isDisabled:isDisabled}
		}).then(function (response) {
            if(response.statusText === "OK"){
                callback(true);
                console.log(response);
            }else{
              //Create an error Box and display the 
              console.log(response);
              callback(false);

            }
          });
	}

	offerFactory.createuniquecodeOffer = function(title,coverImage,cardImage,
		cardActionButtonText,actionButtonText,description,
		shortDescription,costType,costOnline,costPoints,
		termConditionsLink,thankYouText,
		startDate,endDate,validTill,totalQuantity,
		subType,redemptionUrl,cityText,isDisabled){

		var defer = $q.defer();
		$http({
			method: 'POST',
			url: 'http://52.74.136.146/index.php/service/storeOffer/add',
			data: { sessionId:"GUEST",
					title:title,
					coverImage:coverImage,
			 		cardImage:cardImage,
			 		cardActionButtonText:cardActionButtonText,
					actionButtonText:actionButtonText,
					description:description,
					shortDescription:shortDescription,
					costType:costType,
					costOnline:costOnline,
					costPoints:costPoints,
					termConditionsLink:termConditionsLink,
					thankYouText:thankYouText,
					startDate:startDate,
					endDate:endDate,
					validTill:validTill,
					totalQuantity:totalQuantity,
					subType:subType,
					redemptionUrl:redemptionUrl,
					cityText:cityText,
					isDisabled:isDisabled}
		}).success(function (response) {
         	offerFactory = response;
         	defer.resolve(response);
	    }).error(function(err, status) {
	       // defer.reject(err);
	        throw err;
	    })

	     return defer.promise;
	}

	offerFactory.updateOffer = function(id,title,
		cardActionButtonText,actionButtonText,description,
		shortDescription,
		termConditionsLink,thankYouText,
		startDate,endDate,cityText,callback){
		$http({
			method: 'POST',
			url: 'http://52.74.136.146/index.php/service/storeOffer/add',
			data: { sessionId:"GUEST",
					id:id,
					title:title,
					cardActionButtonText:cardActionButtonText,
			 		actionButtonText:actionButtonText,
			 		description:description,
					shortDescription:shortDescription,
					termConditionsLink:termConditionsLink,
					thankYouText:thankYouText,
					startDate:startDate,
					endDate:endDate,
					cityText:cityText	}
		}).then(function (response) {
            if(response.statusText === "OK"){
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

	offerFactory.activeOffer = function(id,active,callback){
		$http({
			method: 'POST',
			url: 'http://52.74.136.146/index.php/service/storeOffer/add',
			data: { sessionId:"GUEST",
					id:id,
					isDisabled:active}
		}).then(function (response) {
            if(response.statusText === "OK"){
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

	offerFactory.getallOffer = function(page,callback){
		$http({
			method: 'GET',
			url: 'http://52.74.136.146/index.php/service/storeOffer/list',
			params: {sessionId:"GUEST", status:'all', page:page}
		}).then(function (response) {
            callback(response);
          });
	}

	offerFactory.getOfferDetails = function(id,callback){
		$http({
			method: 'GET',
			url: 'http://52.74.136.146/index.php/service/storeOffer/get',
			params: {sessionId:"GUEST", status:'all', id:id}
		}).then(function (response) {
			callback(response);
            // if(response.statusText === "OK"){
            //     callback(response);
            //     console.log(response);
            // }else{
            //   //Create an error Box and display the 
            //   console.log(response);
            //   alert('something went wrong please trefresh the page');
            //   callback(false);
              

            // }
          });
	}

	offerFactory.adduniquecode = function(id,coupons,callback){
		$http({
			method: 'POST',
			url: 'http://52.74.136.146/index.php/service/storeOffer/addCoupon',
			data: {sessionId:"GUEST",storeOfferId:id,coupons:coupons}
		}).then(function (response) {
            if(response.statusText === "OK"){
                callback(true);
                console.log(response);
            }else{
              //Create an error Box and display the 
              console.log(response);
              alert('something went wrong please try again after refreshing the page');
              callback(false);
              

            }
          });
	}
	return offerFactory;
}])