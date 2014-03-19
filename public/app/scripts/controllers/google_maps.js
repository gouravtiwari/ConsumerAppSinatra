'use strict';

angular.module('publicApp')
  .controller('GoogleMapsCtrl', function ($scope, Data) {
	  $scope.map = {
	    center: {
	        "latitude": 29.79,
          "longitude": -95.194
	    },
	    zoom: 12
		};
		var parameter_obj = Data.get_search_data();
    
    //Data.get_local('scripts/jsons/product_availability.json').success(function(api_data){
    Data.get_json('StoreAvailability/v1', parameter_obj).success(function(api_data){
      $scope.locations = [];
      $scope.retailers = [];
      var iconNo = 0;
      if(api_data.Product.Availability.AvailabilityStatus != "No Record found for the provided input"){
        for(var i=0; i<api_data.Product.Availability.length; i++){
          $scope.haveOutlets = true;
        	for(var j=0; j<api_data.Product.Availability[i].Retailer.length; j++){
        			iconNo++;
        			api_data.Product.Availability[i].Retailer[j].icon = {icon: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld="+iconNo+"|ff0000|000000"}
        			$scope.retailers.push(api_data.Product.Availability[i].Retailer[j]);
        			var position = {latitude: '', longitude: '', icon: ''};
        			position.latitude = api_data.Product.Availability[i].Retailer[j].Locations.Latitude;
        			position.longitude = api_data.Product.Availability[i].Retailer[j].Locations.Longitude;
        			position.icon = {icon: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld="+iconNo+"|ff0000|000000"}
        	    $scope.locations.push(position);
          }
        }
        $scope.map.center.latitude = position.latitude;
        $scope.map.center.longitude = position.longitude;
      }  
      console.log($scope.map)
    });
  });
