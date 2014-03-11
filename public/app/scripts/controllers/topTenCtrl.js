'use strict';

angular.module('publicApp')
  .controller('TopTenCtrl', function ($scope, Data) {
    $scope.categories = ['Movies', 'Television', 'Books', 'Mobile Apps', 'Video Games', 'Websites', 'Products', 'Music and Twitter TV'];
    $scope.$watch('categoryName', function() {
      if ($scope.resultCategories != undefined){
        for (var i = 0; i<$scope.resultCategories.length; i++) {
          if ($scope.resultCategories[i].CategoryName == $scope.categoryName){
            $scope.SubCategory = $scope.resultCategories[i].SubCategory;
          }
          else{
            $scope.SubCategory = '';
          }
        };
      }
     });
    Data.get_local('scripts/jsons/top_ten.json').success(function(api_data){
      $scope.resultCategories = api_data.Category;
      $scope.categoryName = $scope.categories[0];
    });
  });
