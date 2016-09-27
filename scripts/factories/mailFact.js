app.factory('mailFact', ['$http', function($http){
	var mailFact = {};

	mailFact.sendmail = function(email,subject,message,callback){
		$http({
			method: 'GET',
	      	url: 'api/mail.php',
	      	data : {email:email, subject:subject, message:message}
		}).then(function(response){
			callback(response);
		})
	}
	return mailFact;
}])