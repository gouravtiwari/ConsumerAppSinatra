'use strict';

angular.module('publicApp')
  .controller('RecommenderCtrl', function ($scope, Data) {
    $scope.categories = ['Television', 'Mobile Apps'];
    $scope.selectedSubCategory = {"obj":{}};
    $scope.selectedDemography = {"obj":{}};
    $scope.selectedItem = {"obj":{}};
    $scope.$watch('categoryName', function() {
      $scope.searchByCategory();
    });

    $scope.searchByCategory = function(){
      var parameter_obj = {};

      if ($scope.categoryName){
        // Data.get_json('TopTen/v1/' + $scope.categoryName, parameter_obj).success(function(api_data){
        Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories = api_data.Category;
          console.log('$scope.selectedCategories');
          console.log($scope.selectedCategories);
        });
      }
    };
  });
