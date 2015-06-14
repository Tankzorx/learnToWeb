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
			return $http.post('devices/add')
			.then(function(resp) {
				// success

			}, function() {
				// err
			});
		},
		delete: function(device) {

		},
		update: function(olddevice,newdevice) {

		}
	};
	return deviceStorage;
}]);