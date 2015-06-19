angular.module("learnToWeb")
.factory("deviceStorage",['$http',function($http) {
	var deviceStorage = {
		devices : [],
		get: function() {
			return $http.get('devices')
				.then(function(resp) {
					angular.copy(resp.data,deviceStorage.devices);
					return deviceStorage.devices;
				});
		},
		add: function(device) {
			return $http.post('devices/add',device)
			.then(function(resp) {
				// Success
				deviceStorage.devices.push(resp.data);
				console.log("Added device");
			}, function() {
				//err
				console.log("Error happened when adding device");
			});
		},
		delete: function(deviceId) {
			console.log("Deleting")
			var elem = {"id":deviceId};
			return $http.post('devices/delete',elem)
			.then(function(resp) {
				for (var i = 0; i < deviceStorage.devices.length; i++) {
				  if (deviceStorage.devices[i]._id === deviceId) {
				    deviceStorage.devices.splice(i,1);
				  };
				};
			},function(err) {
				console.log(err);
				//err
			})

		},
		update: function(olddevice,newdevice) {

		}
	};
	return deviceStorage;
}]);