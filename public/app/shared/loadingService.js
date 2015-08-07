angular.module("learnToWeb")
.factory("loadingService",['$http','$location',"$q","$rootScope",function($http,$location,$q,$rootScope) {
	var checkLoads = function () {
		if (loadingService.loading <= 0) {
			$rootScope.loading = false;
		}
		if (loadingService.loading > 0) {
			$rootScope.loading = true;
		};
	};
	var loadingService = {
		loading : 0,
		startLoad: function() {
			loadingService.loading = loadingService.loading < 0 ? loadingService.loading = 0 : loadingService.loading;
			loadingService.loading += 1;
			checkLoads();
		},
		stopLoad: function() {
			loadingService.loading = loadingService.loading < 0 ? loadingService.loading = 0 : loadingService.loading;
			loadingService.loading -= 1;
			checkLoads();
		},
	};
	return loadingService;
}]);

