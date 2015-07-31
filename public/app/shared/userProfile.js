angular.module("learnToWeb")
.factory("userProfile",['$http','$location',"$q",function($http,$location,$q) {
	var userProfile = {
		currentUser : {},
		loggedIn: function() {
			var loggedInPromise = $q.defer();
			$http.get('loggedin')
				.then(function(resp) {
					//console.log(resp);	
					if (resp.data === "0") {
						console.log("No user logged in.")
						$location.url("/home");						
						loggedInPromise.reject();
					} else {
						userProfile.currentUser = resp.data;
						console.log("Current user: " + userProfile.currentUser.username)

						loggedInPromise.resolve();
					}
				});
			return loggedInPromise.promise;
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