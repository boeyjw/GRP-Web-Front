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
var keyword2;

replantMain.controller("searchController", function($scope, $route) {
    var self = this;

    //self.newKeyword = '';

    self.addKeyword = function() {
        //searchService.add(keyword);
        //self.newKeyword = '';
        keyword = $scope.newKeyword;
        $route.reload("#/result");
    };

});



//controller for second page (queryResults_Page(boxes).html)
replantMain.controller("resultsController", function($http, $scope, $route, $location) {
    var self = this;

    //self.searchService = searchService.list;

    $http.get('/find/' + keyword).then(function(res) {
        console.log(res.data);
        $scope.resultset = res.data;
    })

    self.addKeyword2 = function(_id) {
        //searchService.add(keyword);
        //self.newKeyword = '';
        var keyword2 = _id;
        $location.path("/view/" + _id);
    };


});

//================================================================================================================================================================
/*replantMain.controller("search2Controller", function($scope, $route) {
    var self = this;

    //self.newKeyword = '';

    self.addKeyword = function() {
        //searchService.add(keyword);
        //self.newKeyword = '';
        keyword2 = $scope.thePlant;
        $route.reload("#/view");
    };

});*/

replantMain.controller("displayAll", function($http, $scope) {
    console.log(_id);
    $http.get('/view/' + _id).then(function(res, err) {
        if (err) {
            console.log(err)
        } else {
            console.log(res.data);
            $scope.thePlant = res.data;
        }
    })
});