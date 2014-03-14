'use strict';

angular.module('publicApp')
  .controller('ProductReferenceCtrl', function ($scope, Data) {
	  
	  $scope.input = {Description: 'Description...', UPC_CODE: 'UPC Code...'};
    $scope.pageshow = false;

    $scope.currentPage = 1;

    $scope.by_desc = function(){
      var parameter_obj = {'search' : $scope.productDescription,
                          'pageno' : $scope.currentPage};
      Data.get_json('Products/v1', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.pageshow = true;
        $scope.products = api_data.ProductDetails;
        $scope.totalItems = api_data.Summary.TotalPages;
        $scope.maxSize = 10;
      });
    }

    $scope.by_upc = function(){
      var parameter_obj = {'search' : $scope.input.UPC_CODE};

      Data.get_json('Products/v1', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.product_detail = api_data.ProductDetails;
        Data.get_json('Products/v1/'+ $scope.input.UPC_CODE, '').success(function(api_data){
        //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.product_detail_characterstics = api_data.Characteristics;
        });
      });
    }

    $scope.$watch('currentPage', function() {
      if($scope.products != undefined){
        $scope.by_desc();  
      }
    });
  });

  function filter_query(data){
    return data.replace(" ","%20");
  }