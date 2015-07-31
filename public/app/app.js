var app = angular.module("learnToWeb",["ngRoute"]);

app.config(function($routeProvider) {


		$routeProvider
		.when("/home", {
			templateUrl : "app/components/home/home.html",
			controller : "homeCtrl"
		})

		.when("/devices", {
			templateUrl : "app/components/devices/devices.html",
			controller : "devicesCtrl",
			resolve : {
				user : ["userProfile",function(userProfile) {
					return userProfile.loggedIn();
				}],
				devices : ["deviceStorage",function(deviceStorage) {
					return deviceStorage.get();
				}]
			}
		})

		.when("/profile", {
			templateUrl : "app/components/profile/profile.html",
			controller : "profileCtrl",
			resolve : {
				user : ["userProfile",function(userProfile) {
					return userProfile.loggedIn();
				}]			
			}
		})

		.when("/signup", {
			templateUrl : "app/components/signup/signup.html",
			controller : "signupCtrl"
		})


	$routeProvider.otherwise({
		redirectTo: "/home"
	})
})

app.filter("reverse",function() {
	return function(list) {
		return list.slice().reverse();
	}
})