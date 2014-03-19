angular.module('publicApp')
  .controller('SegmentCtrl', function ($scope, Data) {
  
	  $scope.input.addressline = 'Address...';
	  $scope.input.city = 'City...';
	  $scope.input.state = 'State';
	  $scope.input.zip = 'Zip Code';

	  $scope.input.segments = ['PRIZMNE', 'PSYCLENE', 'CONNEXIONSNE'];
	  $scope.input.segmentLevels = ['Z6', 'Z4', 'BG'];

		// Data.get_local('scripts/jsons/segmentationData.json').success(function(api_data){
		// 	$scope.addressDetails = api_data.Address;
		// 	$scope.segments = api_data.Segments[0];
		// 	console.log($scope.segments)
		// });    
    
		$scope.search = function(input){
			$scope.segment = [];
			var segment = $scope.input.segment
			var level = $scope.input.segmentLevel;
			var addressline = $scope.input.addressline;
			var city = $scope.input.city;
			var state = $scope.input.state;
			var zip = $scope.input.zip;
			var api = 'MyBestSegments/v1/' + segment;

			if(level){
				api = api + level + '/';
			}
			
			var parameter_obj = {addressline: addressline, city: city,
				zip: zip};

			if(state) {
				parameter_obj.state = state;
			}
			
			//Data.get_json(api, parameter_obj).success(function(api_data){
			Data.get_local('scripts/jsons/segmentationData.json').success(function(api_data){
        $scope.segments = api_data.Segments[0].SegmentDetails;
        $.each($scope.segments, function(i, segment){
        	for(var field in segment.DemographicsTraits){
        		segment[field] = segment.DemographicsTraits[field];
        	}
        	delete segment.SegSystem;
        	delete segment.SegmentCode;
        });

       	$scope.sortByFields = Data.fillSortByFields($scope.segments[0]);
        Data.injectColorClass($scope.segments, $scope.sortByFields);
        
      });
			
		}

		$scope.$watch('sortBy', function(newvalue, oldvalue){
      console.log(newvalue)
      if(!newvalue || newvalue == oldvalue) return;
      $scope.segments = Data.sortBy(newvalue, $scope.segments);
    });
  
});
