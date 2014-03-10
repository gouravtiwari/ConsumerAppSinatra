'use strict';

angular.module('publicApp')
  .controller('ProductReferenceCtrl', function ($scope, Data) {
	  
	  $scope.input = {Description: 'Description...', UPC_CODE: 'UPC Code...'};

		Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
      $scope.products = api_data.ProductDetails;
    });

    Data.get_local('scripts/jsons/product_by_upc.json').success(function(api_data){
      $scope.product = api_data.Characteristics[0];
    });

  });
