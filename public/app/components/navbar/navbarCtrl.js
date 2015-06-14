angular.module("learnToWeb")
.controller("navbarCtrl",["$scope","$location",function($scope,$location) {
	
	$scope.navItems = ["home","devices","profile"];
	$scope.selectedTab = $scope.navItems.indexOf($location.path().slice(1));

	$scope.setActive = function(index) {
		$scope.selectedTab = index;
	}
}])
