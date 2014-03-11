angular.module('publicApp')
  .controller('StoreCtrl', function ($scope, Data) {
	  
	 
   $scope.options = [
    "Store Name",
    "Owner Name",
    "Location"
   ]
   $scope.select_type = $scope.options[0];

		Data.get_local('scripts/jsons/store_by_name.json').success(function(api_data){
      $scope.stores = api_data.StoreRefData.Stores;
     
    });

  
  });
