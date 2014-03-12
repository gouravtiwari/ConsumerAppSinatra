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
		
    var parameter_obj = 'product_id=' + '0016000275270' + '&' +
                        'lat=' + '29.7907' + '&' +
                        'long=' + '-95.1621' + '&' +
                        'apikey=' + '3359-3a99eff0-e18d-43c2-aad1-5bab4701f6ec';

    //Data.get_local('scripts/jsons/product_availability.json').success(function(api_data){
    Data.get_json('StoreAvailability/v1', parameter_obj).success(function(api_data){
      $scope.locations = [];
      $scope.retailers = [];
      var iconNo = 0;
      for(var i=0; i<api_data.Product.Availability.length; i++){
      	for(var j=0; j<api_data.Product.Availability[i].Retailer.length; j++){
      			iconNo++;
      			api_data.Product.Availability[i].Retailer[j].icon = {icon: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld="+iconNo+"|ff0000|000000"}
      			$scope.retailers.push(api_data.Product.Availability[i].Retailer[j]);
      			var position = {latitude: '', longitude: '', icon: ''};
      			position.latitude = api_data.Product.Availability[i].Retailer[j].Locations.Latitude;
      			position.longitude = api_data.Product.Availability[i].Retailer[j].Locations.Longitude;
      			position.icon = {icon: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld="+iconNo+"|ff0000|000000"}
      			$scope.locations.push(position);
      			$scope.map.center.latitude = position.latitude;
            $scope.map.center.longitude = position.longitude;
      	}
      }  
    });
    
    function getLocation(){
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
      }
      else{
        x.innerHTML="Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position){
      $scope.geolocation = {'lat': position.coords.latitude, 'long': position.coords.longitude};    
    }
  });
