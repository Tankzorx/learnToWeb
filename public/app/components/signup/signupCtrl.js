angular.module("learnToWeb")
.controller("signupCtrl",["$scope","userProfile",function($scope,userProfile) {
	console.log("In signupCtrl")

	$scope.register = function() {
		var newUser = {
			email : $scope.newUser.email,
			password : $scope.newUser.password,
			username : $scope.newUser.username
		}
	    userProfile.register(newUser)
	    .then(function(success) {
	        $scope.isLoggedIn = success;
	    })
	};


}])