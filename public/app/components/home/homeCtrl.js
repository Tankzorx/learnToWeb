angular.module("learnToWeb")
.controller("homeCtrl",["$scope",function($scope) {
	console.log("In homeCtrl")
	$scope.message = "Express"
	$scope.greeting = "Hello"
}])