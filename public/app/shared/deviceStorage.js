angular.module("learnToWeb")
.factory("deviceStorage",['$http',function($http) {
	
	var deviceStorage = {
		devices : [],
		get: function() {
			return $http.get('devices')
				.then(function(resp) {
					angular.copy(resp.data.devices,deviceStorage.devices);
					return deviceStorage.devices;
				});
		},
		add: function(device) {
			return $http.post('devices/add',device)
			.then(function(resp) {
				deviceStorage.devices.push(device);
				console.log("Success")
				return resp;
			}, function() {
				// err
			});
		},
		delete: function(device) {
			return $http.post('devices/remove')

		},
		update: function(olddevice,newdevice) {

		}
	};
	return deviceStorage;
}]);