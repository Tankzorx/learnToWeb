angular.module("learnToWeb")
.controller("navbarCtrl",["$scope","$location","userProfile",function($scope,$location,userProfile) {
    
    $scope.navItems = ["home","devices","profile"];
    $scope.selectedTab = $scope.navItems.indexOf($location.path().slice(1));

    $scope.setActive = function(index) {
        $scope.selectedTab = index;
    };

    $scope.logIn = function() {
        userProfile.logIn($scope.user.email,$scope.user.password);
    };
}])
