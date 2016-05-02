app.filter('ageFilter', function() {
     function calculateAge(birthday) { // birthday is a date
        var bday =new Date(birthday);
         var ageDifMs = Date.now() - bday;
         var ageDate = new Date(ageDifMs); // miliseconds from epoch
         return Math.abs(ageDate.getUTCFullYear() - 1970);
     }

     return function(birthdate) { 
     return calculateAge(birthdate);
     }; 
});

app.filter('instahandle', function () {
        return function (text) {
        if(angular.isDefined(text)){
          if(text.charAt(0) == '@'){
            return text.replace('@','');
          }else{
          return text;
          }
        }
    };
})

app.filter('tojson', function () {
        return function (text) {
          return angular.toJson(text);
      }
})
