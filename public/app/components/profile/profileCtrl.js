angular.module("learnToWeb")
.controller("profileCtrl",["$scope","user",function($scope,user) {
	console.log("In profileCtrl")
	$scope.user = user;
	$scope.message = "Express"
	$scope.greeting = "Hello"
}])