angular.module('publicApp')
  .controller('SegmentCtrl', function ($scope, Data) {
   	  $scope.input = {address: 'Address...', city: 'City...',state:'State',zipcode:'Zip Code'};


	Data.get_local('scripts/jsons/segmentationData.json').success(function(api_data){
      $scope.addressDetails = api_data.Address;
      $scope.segments = api_data.Segments[0].SegmentDetails[0];
     });
	$scope.search = function(input){
		$scope.segment = [];
		var addr = $scope.addressDetails.address;
		var city =  $scope.addressDetails.city;
		var state =  $scope.addressDetails.stateName;
		var code =  $scope.addressDetails.zipCode;
		// if(addr.match(input.address)|| city.search(input.city) || state.search(input.state) || code.search(input.zipcode)){
		// 	console.log("hi")
		// 	$scope.segmentname  = $scope.segments.SegSystem;
		// 	console.log($scope.segmentname )
		// }
	}
  });
