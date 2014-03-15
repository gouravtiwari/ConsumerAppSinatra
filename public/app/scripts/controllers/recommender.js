'use strict';

angular.module('publicApp')
  .controller('RecommenderCtrl', function ($scope, Data) {
    $scope.categories = ['Television', 'Mobile Apps'];
    $scope.selectedSubCategory1 = {"obj":{}};
    $scope.selectedDemography1 = {"obj":{}};
    $scope.selectedItem1 = {"obj":{}};
    
    $scope.selectedSubCategory2 = {"obj":{}};
    $scope.selectedDemography2 = {"obj":{}};
    $scope.selectedItem2 = {"obj":{}};
    
    $scope.selectedSubCategory3 = {"obj":{}};
    $scope.selectedDemography3 = {"obj":{}};
    $scope.selectedItem3 = {"obj":{}};

    $scope.selectedItemsList = [];
    $scope.$watch('categoryName1', function() {
      $scope.searchByCategory();
    });
    $scope.$watch('categoryName2', function() {
      $scope.searchByCategory();
    });
    $scope.$watch('categoryName3', function() {
      $scope.searchByCategory();
    });

    $scope.searchByCategory = function(){
      var parameter_obj = {};

      if ($scope.categoryName1){
        // Data.get_json('TopTen/v1/' + $scope.categoryName, parameter_obj).success(function(api_data){
        Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories1 = api_data.Category;
          console.log('$scope.selectedCategories1');
          console.log($scope.selectedCategories1);
        });
      }
      if ($scope.categoryName2){
        // Data.get_json('TopTen/v1/' + $scope.categoryName, parameter_obj).success(function(api_data){
        Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories2 = api_data.Category;
          console.log('$scope.selectedCategories2');
          console.log($scope.selectedCategories2);
        });
      }
      if ($scope.categoryName3){
        // Data.get_json('TopTen/v1/' + $scope.categoryName, parameter_obj).success(function(api_data){
        Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories3 = api_data.Category;
          console.log('$scope.selectedCategories3');
          console.log($scope.selectedCategories3);
        });
      }
    };

    $scope.recommender = function(){
      $scope.selectedItemsList = [$scope.selectedItem1.obj, $scope.selectedItem2.obj, $scope.selectedItem3.obj];
      console.log($scope.selectedItemsList);
    }
  });
