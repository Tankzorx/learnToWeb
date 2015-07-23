angular.module("learnToWeb")
.factory("deviceStorage",['$http',"$rootScope",function($http,$rootScope) {
	var deviceStorage = {
		devices : [],
		get: function() {
			$rootScope.loading = true;
			return $http.get('devices')
				.then(function(resp) {
					angular.copy(resp.data,deviceStorage.devices);
					$rootScope.loading = false;
					return deviceStorage.devices;
				});
		},
		add: function(device) {
			$rootScope.loading = true;
			return $http.post('devices/add',device)
			.then(function(resp) {
				// Success
				deviceStorage.devices.push(resp.data);
				console.log("Added device");
				$rootScope.loading = false;
			}, function() {
				//err
				console.log("Error happened when adding device");
			});
		},
		delete: function(deviceId) {
			$rootScope.loading = true;
			console.log("Deleting")
			var elem = {"id":deviceId};
			return $http.post('devices/delete',elem)
			.then(function(resp) {
				for (var i = 0; i < deviceStorage.devices.length; i++) {
				  if (deviceStorage.devices[i]._id === deviceId) {
				    deviceStorage.devices.splice(i,1);
				  };
				};
				$rootScope.loading = false;
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