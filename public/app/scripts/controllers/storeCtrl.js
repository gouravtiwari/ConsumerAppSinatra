angular.module('publicApp')
  .controller('StoreCtrl', function ($scope, Data) {
	  
	 $scope.input = {storeName:'',
                   ownerName:'',
                   indicator:'',
                   scanTrackCode:'',
                   marketCode:'',
                   stateFIPS:'',
                   streetaddr:'',
                   city:'',
                   lat:'',
                   lng:'',
                   radius:'',
                   sizeCode:'',
                   spaceArea:''
                 };
   $scope.options = [
    "Store Name",
    "Owner Name",
    "Market",
    "Location",
    "Size"
   ]
   $scope.indicators = [
    "Beer",
    "Cigarette",
    "Gasoline",
    "Liquor",
    "Pharmacy",
    "Wine"
   ]
   $scope.select_type = $scope.options[0];

		// Data.get_local('scripts/jsons/store_by_name.json').success(function(api_data){
  //     $scope.stores = api_data.StoreRefData.Stores;
     
  //   });
    $scope.currentPage = 1;
    $scope.by_name = function(){
      $(".storeDetails").css("display","inline-table")

      var parameter_obj = {'name' : $scope.input.storeName,
                          'pageno' : $scope.currentPage};
      Data.get_json('Stores/v1', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.stores = api_data.StoreRefData.Stores;
        $scope.totalItems = api_data.Summary.TotalPages;
        $scope.maxSize = 10;
      });
    }

    $scope.by_owner = function(){
      $(".storeDetails").css("display","inline-table")

      var parameter_obj = {'owner' : $scope.input.ownerName,
                          'pageno' : $scope.currentPage};
      Data.get_json('Stores/v1', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.stores = api_data.StoreRefData.Stores;
        $scope.totalItems = api_data.Summary.TotalPages;
        $scope.maxSize = 10;
      });
    }

    $scope.by_market = function(){
      $(".storeDetails").css("display","inline-table")
      if($scope.input.marketCode=='' || $scope.input.marketCode==''){
         var parameter_obj = {'indicator' : $scope.input.indicator,
                              'pageno' : $scope.currentPage
                        };
      }
      else{

          var parameter_obj = {'indicator' : $scope.input.indicator,
                          'scantrackcode':$scope.input.scanTrackCode,
                          'marketcode':$scope.input.marketCode,
                          'pageno' : $scope.currentPage
                        };
      }
      Data.get_json('Stores/v1/Market', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.stores = api_data.StoreRefData.Stores;
        $scope.totalItems = api_data.Summary.TotalPages;
        $scope.maxSize = 10;
      });
    }
    $scope.by_location = function(){
      console.log("By location")
      $(".storeDetails").css("display","inline-table")

      var parameter_obj = {'statefipscode' : $scope.input.stateFIPS,
                          'streetaddress' : $scope.input.streetaddr,
                          'city' : $scope.input.city,
                          'latitude' : $scope.input.lat,
                          'longitude' : $scope.input.lng,
                          'radius' : $scope.input.radius,
                          'pageno' : $scope.currentPage
                        };
      Data.get_json('Stores/v1/Location', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.stores = api_data.StoreRefData.Stores;
        $scope.totalItems = api_data.Summary.TotalPages;
        $scope.maxSize = 10;
      });
    }

    $scope.by_size = function(){
      $(".storeDetails").css("display","inline-table")
      if($scope.input.spaceArea==''){
        var parameter_obj = {'sizecode' : $scope.input.sizeCode,
                            'pageno' : $scope.currentPage};
      }
      else{
        var parameter_obj = {'sizecode' : $scope.input.sizeCode,
                          'sellingspacearea':$scope.input.spaceArea,
                          'pageno' : $scope.currentPage};
      }

      Data.get_json('Stores/v1/Size', parameter_obj).success(function(api_data){
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
