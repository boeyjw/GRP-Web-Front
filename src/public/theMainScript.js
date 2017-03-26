var replantMain = angular.module("replantMain", ['ngRoute']);

//routing

replantMain.config(function($routeProvider){
	$routeProvider
	.when('/home', {
		templateUrl: 'replant_HomePage.html'
	})
	.when('/result', {
		templateUrl: 'queryResults_Page(boxes).html'
	})
	.otherwise({
		redirectTo: '/home'
	});
});


//controller for second page (queryResults_Page(boxes).html)
replantMain.controller("resultsController", function($scope){
	/* to be filled with... erm, anything */

	$scope.records = [
		//to be filled
	]
});