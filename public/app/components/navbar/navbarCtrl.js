angular.module("learnToWeb")
.controller("navbarCtrl",["$scope","$location","$timeout","userProfile",
    function($scope,$location,$timeout,userProfile) {

    console.log("in navbarCtrl");
    // Check if user is logged in.
    userProfile.loggedIn().then(function(success) {
        $scope.isLoggedIn = true;
    },function(err) {
        $scope.isLoggedIn = false;
    });
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

    console.log($location.path().slice(1))
    $scope.selectedTab = $location.path().slice(1);

    $scope.setActive = function(tabName) {
        $scope.selectedTab = tabName;
    };

    $scope.logIn = function() {
        userProfile.logIn($scope.user.email,$scope.user.password)
        .then(function(success) {
            console.log(success);
            $scope.isLoggedIn = success;
            $scope.selectedTab = "devices";
            $location.url("/devices");
        })
    };

    $scope.logOut = function() {
    	userProfile.logOut()
        .then(function(success) {
            $scope.isLoggedIn = !success;
            $scope.selectedTab = "home";
            $location.url("/home")
        })
    };
}])
