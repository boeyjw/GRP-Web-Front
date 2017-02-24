var replantDisplay= angular.module('replantDisplay', []);

replantDisplay.controller('displayCtrl', ['$scope', '$http', function($scope, $http) {



var refresh = function() {
  $http.get('/GBIFF').success(function(response) {
    console.log("I got the data I requested");
    $scope.GBIFF = response;
  });
};

refresh();
}
