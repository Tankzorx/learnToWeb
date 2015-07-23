angular.module("learnToWeb")
.directive("navbardirective",function(userProfile) {
	return {
		restrict: "E",
		templateUrl: "app/components/navbar/navbarTmpl.html",
		controller: "navbarCtrl"
	}
});