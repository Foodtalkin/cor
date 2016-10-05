app.factory('mailFact', ['$http', function($http){
	var mailFact = {};

	mailFact.sendmail = function(data,callback){
		$http({
			method: 'POST',
	      	url: 'api/sendgridapi.php',
	      	data : {mail:data}
		}).then(function(response){
			callback(response);
		})
	}

	mailFact.sendmailsaprate = function(email,subject,message,callback){
		$http({
			method: 'POST',
	      	url: 'api/mailbcc.php',
	      	data : {email:email, subject:subject, message:message}
		}).then(function(response){
			callback(response);
		})
	}
	return mailFact;
}])