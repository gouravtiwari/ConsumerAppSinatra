'use strict';

angular.module('publicApp')
  .controller('ProductReferenceCtrl', function ($scope, Data) {
	  
	  $scope.input = {Description: 'Description...', UPC_CODE: 'UPC Code...'};

    Data.get_local('scripts/jsons/product_by_upc.json').success(function(api_data){
      $scope.product = api_data.Characteristics[0];
    });

    Data.get_local('scripts/jsons/product_health.json').success(function(api_data){
      $scope.product = api_data.Characteristics[0];
    });

    $scope.currentPage = 1;

    $scope.by_desc = function(){
      var parameter_obj = 'search=' + $scope.productDescription + '&' +
                          'pageno=' + $scope.currentPage + '&';
      Data.get_json('Products/v1', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
        $scope.products = api_data.ProductDetails;
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

  function filter_query(data){
    return data.replace(" ","%20");
  }