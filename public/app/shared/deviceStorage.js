angular.module("learnToWeb")
.factory("deviceStorage",['$http',"$rootScope","$q","loadingService",function($http,$rootScope,$q,loadingService) {
	var deviceStorage = {
		devices : [],
		get: function() {
			loadingService.startLoad();
			var getPromise = $q.defer();
			$http.get('devices')
				.then(function(resp) {
					angular.copy(resp.data,deviceStorage.devices);
					loadingService.stopLoad();
					getPromise.resolve(deviceStorage.devices);
				},function(err) {
					loadingService.stopLoad();
					console.log("Error when fetching devices: ")
					console.log(err)
					deviceStorage.devices = [];
					getPromise.reject(err);
				});
			return getPromise.promise;
		},
		add: function(device) {
			loadingService.startLoad();
			var addPromise = $q.defer();
			$http.post('devices/add',device)
			.then(function(resp) {
				// Success
				console.log("Added device");
				addPromise.resolve();
				loadingService.stopLoad();
			}, function(err) {
				//err
				console.log("Error happened when adding device:");
				console.log(err);
				addPromise.reject(err);
				loadingService.stopLoad();
			});

			return addPromise.promise;
		},
		delete: function(deviceId) {
			loadingService.startLoad();
			console.log("Deleting")
			var elem = {"id":deviceId};
			return $http.post('devices/delete',elem)
			.then(function(resp) {
				for (var i = 0; i < deviceStorage.devices.length; i++) {
				  if (deviceStorage.devices[i]._id === deviceId) {
				    deviceStorage.devices.splice(i,1);
				  };
				};
				loadingService.stopLoad();
			},function(err) {
				loadingService.stopLoad();
				console.log(err);
			})

		},
		update: function(newdevice) {
			loadingService.startLoad();
			var updatePromise = $q.defer();
			$http.put("devices/update",newdevice)
			.then(function(resp) {
				console.log("Update success");
				console.log(resp);
				loadingService.stopLoad();
				updatePromise.resolve(resp);
			},function(err) {
				console.log("Update failed: " + err);
				loadingService.stopLoad();
				updatePromise.reject(err);
			})

			return updatePromise.promise;
			
		}
	};
	return deviceStorage;
}]);