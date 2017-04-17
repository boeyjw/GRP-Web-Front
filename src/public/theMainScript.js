var replantMain = angular.module("replantMain", ['ngRoute']);

//routing

replantMain.config(function($routeProvider) {
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


/*replantMain.factory('searchService', function() {
    var searchService = {} //new empty object

    searchService.list = [];

    //function add
    searchService.add = function(keyword) {
        searchService.list.push({ text: keyword });
    };

    return searchService; //return object
});*/

var keyword;

replantMain.controller("searchController", function($scope) {
    var self = this;

    //self.newKeyword = '';

    self.addKeyword = function() {
        //searchService.add(keyword);
        //self.newKeyword = '';
        keyword = $scope.newKeyword;
    };

});

//controller for second page (queryResults_Page(boxes).html)
replantMain.controller("resultsController", function($http, $scope) {
    var self = this;

    //self.searchService = searchService.list;

    $http.get('/find/' + keyword).then(function(res) {
        console.log(res.data);
        $scope.resultset = res.data;
    })

    self.addID = function(){
        idValue = $scope.obj._id;
    }
});

replantMain.controller("displayAll", function($http, $scope){

    $http.get('/result/' + idValue).then(function(res){
        console.log(res.data);
        $scope.thePlant = res.data;
    })
});