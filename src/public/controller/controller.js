
var myApp = angular.module('replantMain', []);
myApp.controller('replantCtrl',['$scope','$http',function($scope,$http){
	console.log("Hello World from controller");

	$http.get('/').success(function(response){
		console.log("I got the data i requested");
		$scope.merge = response;
	});
		

	$scope.search = function(){
		console.log($scope.name)
		$http.get('/find/' + $scope.name).success(function(response){
		console.log("I got the data i requested");
		$scope.name = response;
	}).error(function(err) {
		console.log(err);
	});
}


}]);
