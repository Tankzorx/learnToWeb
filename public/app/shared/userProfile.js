angular.module("learnToWeb")
.factory("userProfile",['$http','$location',function($http,$location) {
	var userProfile = {
		currentUser : {},
		loggedIn: function() {
			return $http.get('loggedin')
				.then(function(resp) {
					//console.log(resp);	
					if (resp.data === "0") {
						return false
					} else {
						return true;
					}
				});
		},
		logIn: function(email,password) {
			console.log("logIn() was called in userProfile.js");
			var user = {"email" : email, "password" : password}
			return $http.post("/users/login", user)
				.then(function(resp) {
					userProfile.currentUser = resp;
					return true;
				},function(err) {
					return false;
				})
		},
		logOut: function() {
			console.log("logOut() was called in userProfile.js");
			return $http.get("/users/logout")
			.then(function(resp) {
				userProfile.currentUser = {}
				return true;
			})
		},
		register: function(userObject) {
			console.log("register() was called in userProfile.js")
			return $http.post("/users/signup", userObject)
			.then(function(resp) {
				console.log("Got response from server: " + resp);
			});
		}
	};
	return userProfile;
}]);