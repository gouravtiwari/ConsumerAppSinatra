angular.module('publicApp')
  .controller('StoreCtrl', function ($scope, Data) {
	  
	 
   $scope.options = [
    "Store Name",
    "Owner Name",
    "Location"
   ]
   $scope.select_type = $scope.options[0];

		// Data.get_local('scripts/jsons/store_by_name.json').success(function(api_data){
  //     $scope.stores = api_data.StoreRefData.Stores;
     
  //   });
    $scope.currentPage = 1;
    $scope.by_name = function(){
      $(".storeDetails").css("display","inline-table")

      var parameter_obj = {'name' : $scope.storeName,
                          'pageno' : $scope.currentPage};
      Data.get_json('Stores/v1', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.stores = api_data.StoreRefData.Stores;
        $scope.totalItems = api_data.Summary.TotalPages;
        $scope.maxSize = 10;
      });
    }

    $scope.$watch('currentPage', function() {
      if($scope.products != undefined){
        $scope.by_desc();  
      }
    });


  
  });
