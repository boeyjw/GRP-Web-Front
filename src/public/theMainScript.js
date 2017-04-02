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
	.when('/view', {
		templateUrl: 'replant_ViewPage.html'
	})
	.otherwise({
		redirectTo: '/home'
	});
});

//new 'service' created to store searched keyword
//searched keyword will be stored in 'savedKeyword.list'


replantMain.factory('searchService', function(){
	var savedKeyword = {} //new empty object
	
	savedKeyword.list = [];

	//function add
	searchService.add = function(keyword){
		searchService.list.push({text: keyword});
	};

	return searchService; //return object
});

replantMain.controller("searchController", function(searchService){
	var self - this;

	self.newKeyword = '';

	self.addKeyword = function(keyword){
		searchService.add(keyword);
		self.newKeyword = '';
	};

});

//controller for second page (queryResults_Page(boxes).html)
replantMain.controller("resultsController", function(searchService){
	var self = this;

	self.searchService = searchService.list;
});