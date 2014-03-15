'use strict';

angular.module('publicApp')
  .controller('ProductReferenceCtrl', function ($scope, Data, $modal, $log) {
	  
	  $scope.input.search = $scope.input.search || 'Description / UPC Code';
    $scope.pageshow = false;

    $scope.input.pageno;

    $scope.by_desc = function(){
      var parameter_obj = {'search' : $scope.input.search,
                          'pageno' : $scope.input.pageno || 1};
      Data.get_json('Products/v1', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.pageshow = true;
        $scope.products = api_data.ProductDetails;
        $scope.totalItems = api_data.Summary.TotalPages;
        $scope.maxSize = 10;
      });
    }

    $scope.by_upc = function(){
      
      var parameter_obj = {'search' : $scope.input.search};
      Data.set_search_data({'product_id' : $scope.input.search});
      Data.get_json('Products/v1', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.product_detail = api_data.ProductDetails;
        Data.get_json('Products/v1/'+ $scope.input.search, '').success(function(api_data){
        //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.product_detail_characterstics = api_data.Characteristics;
        });
      });
    }

    $scope.$watch('input.pageno', function(newValue, oldValue) {
      if(newValue == oldValue) return;
      if($scope.products != undefined){
        $scope.by_desc();  
      }
    });

    $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'views/modal_window.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  if($scope.viaRecentSearch) {
    $scope.products = $scope.cache_response.ProductDetails;
    $scope.viaRecentSearch = false;
  }

  $scope.$watch('cache_response', function(newValue, oldValue){
    if(newValue == oldValue) { return; }
    if($scope.cache_response.ProductDetails) {
      $scope.products = $scope.cache_response.ProductDetails;
      $scope.pageshow = true;
      $scope.totalItems = $scope.cache_response.Summary.TotalPages;
      $scope.maxSize = 10;
    }
  });

  });
