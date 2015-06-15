angular.module("learnToWeb")
.controller("devicesCtrl",["$scope","deviceStorage",function($scope,deviceStorage) {


	$scope.configMode = false;
	$scope.devices = deviceStorage.devices;
	$scope.configButtonText = $scope.configMode ? "Action Mode" : "Config Mode";


	$scope.newDeviceName = "";

	$scope.addDevice = function() {
		console.log($scope.newDeviceName);

		var newDevice = {
			name: $scope.newDeviceName,
			ip: $scope.newDeviceIP,
			mac: $scope.newDeviceMAC
		}
		$scope.newDeviceName = "";
		$scope.newDeviceIP = "";
		$scope.newDeviceMAC = "";


		deviceStorage.add(newDevice)
		// .then(function(resp) {
		// 	console.log($scope.devices.length);
		// })
	}

	$scope.removeDevice = function(deviceId) {

	}

	$scope.switchMode = function() {
		$scope.configMode = !$scope.configMode;
	}


}])