'use strict';

angular.module('publicApp')
  .controller('GoogleMapsCtrl', function ($scope, Data) {
	  
	  $scope.map = {
	    center: {
	        latitude: 45,
	        longitude: -73
	    },
	    zoom: 8
		};

		Data.get_local('scripts/jsons/data.json').success(function(api_data){
      console.log(api_data)
    });

  });
