angular.module("learnToWeb")
.controller("profileCtrl",["$scope",function($scope) {
	console.log("In profileCtrl")

	$scope.message = "Express"
	$scope.greeting = "Hello"
}])