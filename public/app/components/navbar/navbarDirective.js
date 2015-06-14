angular.module("learnToWeb")
.directive("navbardirective",function() {
	return {
		restrict: "E",
		templateUrl: "app/components/navbar/navbarTmpl.html",
		controller: "navbarCtrl"
	}
});