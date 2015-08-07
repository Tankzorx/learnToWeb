angular.module("learnToWeb")
.factory("userProfile",['$http','$location',"$q","$rootScope","loadingService",function($http,$location,$q,$rootScope,loadingService) {
	var userProfile = {
		currentUser : {},
		loggedIn: function() {
			var loggedInPromise = $q.defer();
			$http.get('loggedin')
				.then(function(resp) {
					if (resp.data === "0") {
						console.log("No user logged in.")
						$location.url("/home");						
						loggedInPromise.reject();
					} else {
						userProfile.currentUser = resp.data;
						console.log("Current user: " + userProfile.currentUser.username)
						loggedInPromise.resolve(userProfile.currentUser);
					}
				});
			return loggedInPromise.promise;
		},
		logIn: function(email,password) {
			loadingService.startLoad();
			console.log("logIn() was called in userProfile.js");
			var user = {"email" : email, "password" : password}
			return $http.post("/users/login", user)
				.then(function(resp) {
					userProfile.currentUser = resp;
					loadingService.stopLoad();
					return true;
				},function(err) {
					loadingService.stopLoad();
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