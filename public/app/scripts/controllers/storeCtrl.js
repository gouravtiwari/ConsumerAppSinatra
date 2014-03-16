angular.module('publicApp')
  .controller('StoreCtrl', function ($scope,$rootScope,$modal, Data) {
	  
	 $scope.input.storeName = '';
   $scope.input.ownerName = '';
   $scope.input.indicator = '';
   $scope.input.scanTrackCode = '';
   $scope.input.marketCode = '';
   $scope.input.stateFIPS = '';
   $scope.input.streetaddr = '';
   $scope.input.city = '';
   $scope.input.lat = '';
   $scope.input.lng = '';
   $scope.input.radius = '';
   $scope.input.sizeCode = '';
   $scope.input.spaceArea = '';
   $scope.input.select_type = '';
                

   $scope.options = [
    "Store Name",
    "Owner Name",
    "Market",
    "Location",
    "Size"
   ];
   $scope.pageshow = false;
   $scope.indicators = [
    "",
    "Beer",
    "Cigarette",
    "Gasoline",
    "Liquor",
    "Pharmacy",
    "Wine"
   ]
   $scope.input.select_type = $scope.options[0];
   $(".error").hide();

   $scope.currentPage = 1;

    $scope.by_name = function(){
      if($scope.input.prevSearch != $scope.input.search){
        $scope.input.pageno = null;
      }
        var parameter_obj = {'name' : $scope.input.storeName,
                            'pageno' : $scope.input.pageno || 1 };
        Data.get_json('Stores/v1', parameter_obj).success(function(api_data){
          if(api_data.StoreRefData == undefined){
            $scope.status_name = api_data.Summary.Status;
            if($scope.status_name!=""){
            $(".error").show();
            }
          }
          else{
            $scope.pageshow = true;
            $(".storeDetails").css("display","inline-table")

         //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
          $scope.stores = api_data.StoreRefData.Stores;
          $scope.totalItems = api_data.Summary.TotalPages;
          $scope.maxSize = 10;
          }
        });
    }

    $scope.by_owner = function(){
      
        var parameter_obj = {'owner' : $scope.input.ownerName,
                            'pageno' : $scope.currentPage};
        Data.get_json('Stores/v1', parameter_obj).success(function(api_data){
          if(api_data.StoreRefData == undefined){
            $scope.status_owner = api_data.Summary.Status;
            if($scope.status_owner!=""){
            $(".error").show();
            }
          }
          else{
          //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
            $(".storeDetails").css("display","inline-table")
            $scope.pageshow = true;
            $scope.stores = api_data.StoreRefData.Stores;
            $scope.totalItems = api_data.Summary.TotalPages;
            $scope.maxSize = 10;
          }
        });
    }

    $scope.by_market = function(){
      var parameter_obj = {'indicator' : $scope.input.indicator,
                          'scantrackcode':$scope.input.scanTrackCode,
                          'marketcode':$scope.input.marketCode,
                          'pageno' : $scope.currentPage
                        };
       for(obj in parameter_obj){
        if(parameter_obj[obj]==''){
          delete parameter_obj[obj]
        }
      }
     
      Data.get_json('Stores/v1/Market', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        if(api_data.StoreRefData == undefined){
          $scope.status_market = api_data.Summary.Status;
          if($scope.status_market!=""){
            $(".error").show();
          }
        }
        else{
          $(".storeDetails").css("display","inline-table");
          $scope.pageshow = true;
          $scope.stores = api_data.StoreRefData.Stores;
          $scope.totalItems = api_data.Summary.TotalPages;
          $scope.maxSize = 10;
        }
      });
    }

    $scope.by_location = function(){
      
      var parameter_obj = {'statefipscode' : $scope.input.stateFIPS,
                          'streetaddress' : $scope.input.streetaddr,
                          'city' : $scope.input.city,
                          'latitude' : $scope.input.lat,
                          'longitude' : $scope.input.lng,
                          'radius' : $scope.input.radius,
                          'pageno' : $scope.currentPage
                        };
      for(obj in parameter_obj){
        if(parameter_obj[obj]==''){
          delete parameter_obj[obj]
        }
      }

      Data.get_json('Stores/v1/Location', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        if(api_data.StoreRefData == undefined){
          $scope.status_loc = api_data.Summary.Status;
          if($scope.status_loc!=""){
            $(".error").show();
          }
        }
        else{
          $scope.pageshow = true;
          $(".storeDetails").css("display","inline-table")
          $scope.stores = api_data.StoreRefData.Stores;
          $scope.totalItems = api_data.Summary.TotalPages;
          $scope.maxSize = 10;
        }    
      })

    }

    $scope.by_size = function(){
     
        var parameter_obj = {'sizecode' : $scope.input.sizeCode,
                          'sellingspacearea':$scope.input.spaceArea,
                          'pageno' : $scope.currentPage};
       for(obj in parameter_obj){
        if(parameter_obj[obj]==''){
          delete parameter_obj[obj]
        }
      }    

      Data.get_json('Stores/v1/Size', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        if(api_data.StoreRefData == undefined){
          $scope.status_size = api_data.Summary.Status;
          if($scope.status_size!=""){
            $(".error").show();
          }
        }
        else{
          $(".storeDetails").css("display","inline-table");
          $scope.pageshow = true;
          $scope.stores = api_data.StoreRefData.Stores;
          $scope.totalItems = api_data.Summary.TotalPages;
          $scope.maxSize = 10;
        }
      });
    }

    $scope.$watch('input.pageno', function(newValue,oldValue) {
      if(newValue == oldValue) return;
      if(isNaN($scope.input.pageno) || $scope.input.pageno == null) return; 
        if($scope.input.select_type == 'Store Name'){
            $scope.by_name(); 
        }
        else if($scope.input.select_type == 'Owner Name'){
          $scope.by_owner();
        }
        else if($scope.input.select_type == 'Location'){
          $scope.by_location();
        }
        else if($scope.input.select_type == 'Market'){
          $scope.by_market();
        }
        else if($scope.input.select_type == 'Size'){
          $scope.by_size();
        } 
      
    });
    $scope.$watch('input.select_type',function(){
       $rootScope.select = $scope.input.select_type;
       $(".storeDetails").css("display","none");
       $scope.pageshow = false;
       //$scope.input = '';

    })
    if($scope.viaRecentSearch) {
      if($scope.cache_response.StoreRefData.Stores){
        $scope.AppDetails = $scope.cache_response.StoreRefData.Stores;
      }
      $scope.viaRecentSearch = false;
    }
    $scope.$watch('cache_response', function(newValue, oldValue){
      console.log(' changed')

      if(newValue == oldValue) { return; }
      console.log($scope.cache_response.StoreRefData.Stores)
      if($scope.cache_response.StoreRefData.Stores) {
        $(".storeDetails").css("display","inline-table");
        $scope.stores = $scope.cache_response.StoreRefData.Stores;
        $scope.pageshow = true;
        $scope.totalItems = $scope.cache_response.Summary.TotalPages;
        $scope.maxSize = 10;
        //$scope.cache_response = {};
      }
      });

  $scope.open = function (code) {
    var parameter_obj = {};
      Data.get_json('Stores/v1/'+ code , parameter_obj).success(function(api_data){
        $scope.storeInfo = api_data.StoreInfo.Characteristics[0];

        var modalInstance = $modal.open({
          templateUrl: 'views/store_info.html',
          controller: 'ModalInstanceCtrlStore',
          resolve: {
            info: function () {
              return $scope.storeInfo;
            }
          }
        });
      });
    };
  })
.controller('ModalInstanceCtrlStore', [ '$scope', '$modalInstance', 'info', function ($scope, $modalInstance, info) {
 $scope.storeInfo = info;
    $scope.ok = function () {
    $modalInstance.close();
  }; 
}]);

