'use strict';

angular.module('publicApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.go = function(url) {
    	$location.path(url);
    }
  });
