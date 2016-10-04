app.factory('mailFact', ['$http', function($http){
	var mailFact = {};

	mailFact.sendmail = function(data,callback){
		$http({
			method: 'POST',
	      	url: 'https://api.sendgrid.com/v3/mail/send',
	      	data : data,
	      	headers: {'Authorization': 'Bearer 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',
				      'Content-Type': 'application/json' , 
				    'Access-Control-Allow-Origin': '*',
				    'Access-Control-Allow-Methods': 'POST',
				    'Access-Control-Allow-Headers':'X-Requested-With'}
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