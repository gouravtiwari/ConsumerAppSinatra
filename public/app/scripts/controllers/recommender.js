'use strict';

angular.module('publicApp')
  .controller('RecommenderCtrl', function ($scope, Data) {
    $scope.categories = ['Television', 'Mobile Apps'];
    $scope.$watch('categoryName', function() {
      $scope.search();
    });

    $scope.search = function(){
      var parameter_obj = {};

      if ($scope.categoryName){
        Data.get_json('TopTen/v1/' + $scope.categoryName, parameter_obj).success(function(api_data){
        //Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategory = api_data.Category;
          $scope.SubCategory = api_data.Category[0].SubCategory;
        });
      }
    }
  });
