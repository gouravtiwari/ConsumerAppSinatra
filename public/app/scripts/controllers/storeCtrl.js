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
    "",
    "Beer",
    "Cigarette",
    "Gasoline",
    "Liquor",
    "Pharmacy",
    "Wine"
   ]
   $scope.select_type = $scope.options[0];
   $(".error").hide();
   $(".error1").hide();


   $scope.currentPage = 1;

    $scope.by_name = function(){

      if($scope.input.storeName==''){
        $(".error").show();
      }
      else{
        $(".error").hide();
        $(".storeDetails").css("display","inline-table")
        var parameter_obj = {'name' : $scope.input.storeName,
                            'pageno' : $scope.currentPage};
        Data.get_json('Stores/v1', parameter_obj).success(function(api_data){
          $scope.status_name = api_data.Summary.Status;
          if($scope.status_name!=""){
          $(".error1").show();
        }
         //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
          $scope.stores = api_data.StoreRefData.Stores;
          $scope.totalItems = api_data.Summary.TotalPages;
          $scope.maxSize = 10;
        });
      }
    }

    $scope.by_owner = function(){
      if($scope.input.ownerName==''){
        $(".error").show();
      }
      else{
        $(".error").hide();

        $(".storeDetails").css("display","inline-table")

        var parameter_obj = {'owner' : $scope.input.ownerName,
                            'pageno' : $scope.currentPage};
        Data.get_json('Stores/v1', parameter_obj).success(function(api_data){
          $scope.status_owner = api_data.Summary.Status;
          if($scope.status_owner!=""){
          $(".error1").show();
        }
          //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
          $scope.stores = api_data.StoreRefData.Stores;
          $scope.totalItems = api_data.Summary.TotalPages;
          $scope.maxSize = 10;
        });
      }
    }

    $scope.by_market = function(){
      $(".storeDetails").css("display","inline-table")
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
        $scope.status_market = api_data.Summary.Status;
        if($scope.status_market!=""){
          $(".error").show();
        }
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
      for(obj in parameter_obj){
        if(parameter_obj[obj]==''){
          delete parameter_obj[obj]
        }
      }

      Data.get_json('Stores/v1/Location', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.status_loc = api_data.Summary.Status;
        if($scope.status_loc!=""){
          $(".error").show();
        }
        $scope.stores = api_data.StoreRefData.Stores;
        $scope.totalItems = api_data.Summary.TotalPages;
        $scope.maxSize = 10;

      })

    }

    $scope.by_size = function(){
      $(".storeDetails").css("display","inline-table")
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
        $scope.status_size = api_data.Summary.Status;
        if($scope.status_size!=""){
          $(".error").show();
        }
        $scope.stores = api_data.StoreRefData.Stores;
        $scope.totalItems = api_data.Summary.TotalPages;
        $scope.maxSize = 10;
      });
    }

    $scope.$watch('currentPage', function() {
      if($scope.stores != undefined){
        if($scope.select_type == 'Store Name'){
            $scope.by_name(); 
        }
        else if($scope.select_type == 'Owner Name'){
          $scope.by_owner();
        }
        else if($scope.select_type == 'Location'){
          $scope.by_location();
        }
        else if($scope.select_type == 'Market'){
          $scope.by_market();
        }
        else if($scope.select_type == 'Size'){
          $scope.by_size();
        } 
      }
    });


  
  });
