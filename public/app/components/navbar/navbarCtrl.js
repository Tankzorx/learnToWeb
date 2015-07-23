angular.module("learnToWeb")
.controller("navbarCtrl",["$scope","$location","$timeout","userProfile",
    function($scope,$location,$timeout,userProfile) {
    
    $scope.navItems = 
    [
    	{
    		href : "home",
    		text : "Home",
    		showWhenLoggedOut: true,
            showWhenLoggedIn  : true
    	},
    	{
    		href : "devices",
    		text : "Devices",
    		showWhenLoggedOut : false,
            showWhenLoggedIn  : true
    	},
    	{
    		href : "profile",
    		text : "Profile",
    		showWhenLoggedOut : false,
            showWhenLoggedIn  : true
    	},
        {
            href : "signup",
            text : "Sign Up!",
            showWhenLoggedOut : true,
            showWhenLoggedIn  : false
        }
    ];

    $scope.selectedTab = $scope.navItems.indexOf($location.path().slice(1));

    $scope.setActive = function(index) {
        $scope.selectedTab = index;
    };

    $scope.logIn = function() {
        userProfile.logIn($scope.user.email,$scope.user.password)
        .then(function(success) {
            $scope.isLoggedIn = success;
        })
    };

    userProfile.loggedIn().then(function(success) {
        $scope.isLoggedIn = success;
    });

    $scope.logOut = function() {
    	userProfile.logOut()
        .then(function(success) {
            $scope.isLoggedIn = !success;
        })
    };
}])
