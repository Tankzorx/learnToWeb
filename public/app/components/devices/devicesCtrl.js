angular.module("learnToWeb")
.controller("devicesCtrl",["$scope","deviceStorage","$rootScope","user","devices",function($scope,deviceStorage,$rootScope,user,devices) {
	console.log("In deviceCtrl")

	console.log(user);
	console.log(devices);
	$scope.devices = deviceStorage.devices;
	$scope.configButtonText = $scope.configMode ? "Action Mode" : "Config Mode";
	$scope.configMode = false;
	$scope.editDevice = {};

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
		$rootScope.loading = true;
	}

	$scope.removeDevice = function(deviceId) {
		deviceStorage.delete(deviceId);
	}

	$scope.editThis = function(index) {
		$scope.editDevice = {};
		console.log(index);
		$scope.currEdit = index;
	}

	$scope.switchMode = function() {
		$scope.configMode = !$scope.configMode;
	}

	$scope.update = function(id) {
		console.log("Called update");
		console.log($scope.editDevice[id].name)
		console.log($scope.editDevice[id].ipAdress)
		console.log($scope.editDevice[id].macAdress)
		console.log($scope.editDevice[id].type)
		$scope.editDevice[id].id = id;
		deviceStorage.update($scope.editDevice[id])
		.then(function(resp) {
			deviceStorage.get()
		},function(err) {

		})
		$scope.currEdit = -1;
	}


}])