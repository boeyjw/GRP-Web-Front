
var myApp = angular.module('replantMain', []);
myApp.controller('replantCtrl',['$scope','$http',function($scope,$http){
	console.log("Hello World from controller");

	$http.get('/Merge').success(function(response){
		console.log("I got the data i requested");
		$scope.merge = response;
	});
		

	$scope.search = function(){

		$http.get('/Merge').success(function(response){
		console.log("I got the data i requested");
		$scope.merge = response;
	});
}









}]);
