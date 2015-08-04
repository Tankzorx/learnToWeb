angular.module("learnToWeb")
.factory("deviceStorage",['$http',"$rootScope","$q",function($http,$rootScope,$q) {
	var deviceStorage = {
		devices : [],
		get: function() {
			$rootScope.loading = true;
			return $http.get('devices')
				.then(function(resp) {
					angular.copy(resp.data,deviceStorage.devices);
					$rootScope.loading = false;
					return deviceStorage.devices;
				},function(err) {
					$rootScope.loading = false;
					console.log("Error when fetching devices: ")
					console.log(err)
					deviceStorage.devices = [];
					return false;
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
				$rootScope.loading = false;
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
				$rootScope.loading = false;
				console.log(err);
			})

		},
		update: function(newdevice) {
			$rootScope.loading = true;
			var loggedInPromise = $q.defer();
			$http.put("devices/update",newdevice)
			.then(function(resp) {
				console.log("Update success");
			},function(err) {
				console.log("Update failed: " + err);
			})
			
		}
	};
	return deviceStorage;
}]);