angular.module('publicApp')
  .controller('StoreCtrl', function ($scope, Data) {
	  
	 	Data.get_local('scripts/jsons/store_by_name.json').success(function(api_data){
      $scope.stores = api_data.StoreRefData.Stores;
     
    });

   
  });
