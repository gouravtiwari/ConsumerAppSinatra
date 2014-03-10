'use strict';

angular.module('publicApp')
  .controller('ProductReferenceCtrl', function ($scope, Data) {
	  
	  $scope.input = {Description: 'Search Product...'};

		Data.get_local('scripts/jsons/product_by_desc.json').success(function(api_data){
      $scope.products = api_data.ProductDetails;
    });

  });
