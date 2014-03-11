angular.module('publicApp')
  .controller('SegmentCtrl', function ($scope, Data) {
   	  $scope.input = {address: 'Address...', city: 'City...',state:'State',zipcode:'Zip Code'};


	Data.get_local('scripts/jsons/segmentationData.json').success(function(api_data){
      $scope.addressDetails = api_data.Address;
      $scope.segments = api_data.Segments[0];
      console.log($scope.segments)
    
	$scope.search = function(input){
		$scope.segment = [];
		var addr = $scope.addressDetails.address;
		var city =  $scope.addressDetails.city;
		var state =  $scope.addressDetails.stateName;
		var code =  $scope.addressDetails.zipCode;
		
		if(addr.indexOf(input.address)!=-1 || input.city == city || input.state == state || input.zipcode == code){
			$scope.segment = $scope.segments.SegmentDetails;
		}
		// if(addr.match(input.address)|| city.search(input.city) || state.search(input.state) || code.search(input.zipcode)){
		// 	console.log("hi")
		// 	$scope.segmentname  = $scope.segments.SegSystem;
		// 	console.log($scope.segmentname )
		// }
	}
  });
});
