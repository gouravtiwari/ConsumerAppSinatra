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
        });
      }
      if ($scope.categoryName2){
        // Data.get_json('TopTen/v1/' + $scope.categoryName, parameter_obj).success(function(api_data){
        Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories2 = api_data.Category;
        });
      }
      if ($scope.categoryName3){
        // Data.get_json('TopTen/v1/' + $scope.categoryName, parameter_obj).success(function(api_data){
        Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories3 = api_data.Category;
        });
      }
    };

    $scope.recommender = function(){
      $scope.selectedItemsList = [{
          "category": $scope.categoryName1,
          "subCategory": $scope.selectedSubCategory1.obj.SubCategoryName,
          "demography": $scope.selectedDemography1.obj.DemographyName,
          "item": $scope.selectedItem1.obj
        }, {
          "category": $scope.categoryName2,
          "subCategory": $scope.selectedSubCategory2.obj.SubCategoryName,
          "demography": $scope.selectedDemography2.obj.DemographyName,
          "item": $scope.selectedItem2.obj
        },{
          "category": $scope.categoryName3,
          "subCategory": $scope.selectedSubCategory3.obj.SubCategoryName,
          "demography": $scope.selectedDemography3.obj.DemographyName,
          "item": $scope.selectedItem3.obj
        }
      ];
      $scope.recommendationScore = $scope.computeScore();
      $scope.recommendationRating = $scope.computeRating($scope.recommendationScore);
    };

    $scope.computeScore = function(){
      var score = 0;
      for (var i = 0; i < $scope.selectedItemsList.length; i++) {
        $scope.selectedItemsList[i].item.Score = ($scope.rankScore($scope.selectedItemsList[i].item.Rank) * 10)/3 ;
        score = score + $scope.selectedItemsList[i].item.Score;
      };
      console.log($scope.selectedItemsList);
      return score;
    };

    $scope.rankScore = function(rank){
      var ary = [10,9,8,7,6,5,4,3,2,1];
      return ary[rank-1];
    };

    $scope.computeRating = function(score){
      var rating = '';
      if (score >=90) {
        rating = 'Excellent';
      }else if (score >= 70) {
        rating = 'Very Good';
      }else if (score >= 50) {
        rating = 'Good';
      }else if (score >= 30) {
        rating = 'Ok';
      }else {
        rating = 'Poor';
      } 
      return rating;
    }
  });
