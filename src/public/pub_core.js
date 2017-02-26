var replantDisplay= angular.module('replantDisplay', []);

replantDisplay.controller('displayCtrl', function($scope, $http) {

  function GBIF(){
  $http.get('/GBIF').then(function(response) {
    console.log("I got the data I requested");
    $scope.GBIF = response.data;
    console.log(response);
  }, function(response) {
    console.log('Error: ' + response);
  });
}