var pubView = angular.module('pubView', []);

pubView.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {



var refresh = function() {
  $http.get('/GBIFF').success(function(response) {
    console.log("I got the data I requested");
    $scope.GBIFF = response;
    $scope.contact = "";
  });
};

refresh();
