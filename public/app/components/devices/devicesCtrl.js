angular.module("learnToWeb")
.controller("devicesCtrl",["$scope","deviceStorage",function($scope,deviceStorage) {

	$scope.devices = deviceStorage.devices;
	$scope.configButtonText = $scope.configMode ? "Action Mode" : "Config Mode";
	$scope.configMode = false;

	$scope.newDeviceName = "";

	$scope.addDevice = function() {
		console.log($scope.newDeviceName);

		var newDevice = {
			name: $scope.newDeviceName,
			ipAdress: $scope.newDeviceIP,
			macAdress: $scope.newDeviceMAC,
			type: $scope.newDeviceType
		}
		$scope.newDeviceName = "";
		$scope.newDeviceIP = "";
		$scope.newDeviceMAC = "";
		$scope.newDeviceType = "";

		deviceStorage.add(newDevice)
		// .then(function(resp) {
		// 	console.log($scope.devices.length);
		// })
		// <i class="fa fa-cog fa-spin"></i>
	}

	$scope.removeDevice = function(deviceId) {
		deviceStorage.delete(deviceId);
	}

	$scope.switchMode = function() {
		$scope.configMode = !$scope.configMode;
	}


}])