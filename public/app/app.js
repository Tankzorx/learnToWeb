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
				// devices : ["deviceStorage",function(deviceStorage) {
				// 	return deviceStorage.get()
				// 	.then(function(data) {
				// 		console.log(deviceStorage);
				// 		return deviceStorage.devices;
				// 	})
				// }]
				devices : ["deviceStorage",function(deviceStorage) {
					deviceStorage.get();
					return deviceStorage.devices;
				}]
			}
		})

		.when("/profile", {
			templateUrl : "app/components/profile/profile.html",
			controller : "profileCtrl"
		})


	$routeProvider.otherwise({
		redirectTo: "/home"
	})
})