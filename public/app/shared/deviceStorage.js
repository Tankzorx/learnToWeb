angular.module("learnToWeb")
.factory("deviceStorage",['$http',"$rootScope","$q",function($http,$rootScope,$q) {
	var deviceStorage = {
		devices : [],
		get: function() {
			$rootScope.loading = true;
			var getPromise = $q.defer();
			$http.get('devices')
				.then(function(resp) {
					angular.copy(resp.data,deviceStorage.devices);
					$rootScope.loading = false;
					getPromise.resolve(deviceStorage.devices);
				},function(err) {
					$rootScope.loading = false;
					console.log("Error when fetching devices: ")
					console.log(err)
					deviceStorage.devices = [];
					getPromise.reject(err);
				});
			return getPromise.promise;
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
			var updatePromise = $q.defer();
			$http.put("devices/update",newdevice)
			.then(function(resp) {
				console.log("Update success");
				console.log(resp);
				$rootScope.loading = false;
				updatePromise.resolve(resp);
			},function(err) {
				console.log("Update failed: " + err);
				$rootScope.loading = false;
				updatePromise.reject(err);
			})

			return updatePromise.promise;
			
		}
	};
	return deviceStorage;
}]);