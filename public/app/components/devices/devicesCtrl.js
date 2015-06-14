angular.module("learnToWeb")
.controller("devicesCtrl",["$scope","devices","deviceStorage",function($scope,devices,deviceStorage) {


	$scope.devices = devices;

	// deviceStorage.get().then(function(resp) {
	// 	$scope.devices = resp.devices;
	// })

}])