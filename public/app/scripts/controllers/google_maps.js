'use strict';

angular.module('publicApp')
  .controller('GoogleMapsCtrl', function ($scope, Data) {
	  
	  $scope.map = {
	    center: {
	        "latitude":"20",
          "longitude":"21"
	    },
	    zoom: 12
		};

		Data.get_local('scripts/jsons/product_availability.json').success(function(api_data){
      $scope.locations = [];
      $scope.retailers = [];
      for(var i=0; i<api_data.Product.Availability.length; i++){
      	for(var j=0; j<api_data.Product.Availability[i].Retailer.length; j++){
      			$scope.retailers.push(api_data.Product.Availability[i].Retailer[j]);
      			var position = {latitude: '', longitude: ''};
      			position.latitude = api_data.Product.Availability[i].Retailer[j].Locations.Latitude;
      			position.longitude = api_data.Product.Availability[i].Retailer[j].Locations.Longitude;
      			$scope.locations.push(position);
      			$scope.map.center = position;
      	}
      }
    });

  });
