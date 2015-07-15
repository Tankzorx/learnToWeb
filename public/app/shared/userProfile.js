angular.module("learnToWeb")
.factory("userProfile",['$http','$location',function($http,$location) {
	var userProfile = {
		currentUser : {},
		loggedIn: function() {
			return $http.get('loggedin')
				.then(function(resp) {
					console.log(resp);	
					if (resp.data === "0") {
						//$location.url("/home")
					} else {
						currentUser = resp.data;
					}
				});
		},
		logIn: function(username,password) {
			console.log("logIn() was called in userProfile.js");
			return true;
		}
	};
	return userProfile;
}]);