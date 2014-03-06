'use strict';

angular.module('publicApp')
  .controller('GoogleMapsCtrl', function ($scope) {
	   $scope.map = {
		    center: {
		        latitude: 45,
		        longitude: -73
		    },
		    zoom: 8
		};
  });
