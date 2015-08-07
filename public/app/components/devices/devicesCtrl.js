angular.module("learnToWeb")
.controller("devicesCtrl",["$scope","deviceStorage","$rootScope","user","devices",function($scope,deviceStorage,$rootScope,user,devices) {
	console.log("In deviceCtrl")

	console.log(user);
	console.log(devices);
	$scope.devices = deviceStorage.devices;
	$scope.configButtonText = $scope.configMode ? "Action Mode" : "Config Mode";
	$scope.configMode = false;
	$scope.editDevice = {};
	$scope.refDevices = {};

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
		.then(function(resp) {

		})
		//loadingService.startLoad();
	}

	$scope.removeDevice = function(deviceId) {
		deviceStorage.delete(deviceId);
	}

	$scope.editThis = function(index) {
		// $scope.editDevice = {};
		console.log(index);
		$scope.currEdit = index;
	}

	$scope.switchMode = function() {
		$scope.configMode = !$scope.configMode;
	}

	$scope.update = function(id) {
		console.log("Called update");
		if ($scope.editDevice[id]) {

			$scope.editDevice[id].id = id;
			deviceStorage.update($scope.editDevice[id])
			.then(function(resp) {
				deviceStorage.get()
				.then(function() {
					$scope.currEdit = -1;
				})
			},function(err) {

			})
			return;
		} else {
			$scope.currEdit = -1;
			return;
		}
	}


}])