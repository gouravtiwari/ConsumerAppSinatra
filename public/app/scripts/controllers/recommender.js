'use strict';

angular.module('publicApp')
  .controller('RecommenderCtrl', function ($scope, Data) {
    $scope.categories = ['Mobile Apps', 'Movies', 'Television', 'Websites'];
    $scope.numberOfRows = [1,2,3,4,5,6,7,8,9,10];

    $scope.selectedSubCategory1 = {"obj":{}};
    $scope.selectedSubCategory2 = {"obj":{}};
    $scope.selectedSubCategory3 = {"obj":{}};
    $scope.selectedSubCategory4 = {"obj":{}};
    $scope.selectedSubCategory5 = {"obj":{}};
    $scope.selectedSubCategory6 = {"obj":{}};
    $scope.selectedSubCategory7 = {"obj":{}};
    $scope.selectedSubCategory8 = {"obj":{}};
    $scope.selectedSubCategory9 = {"obj":{}};
    $scope.selectedSubCategory10 = {"obj":{}};

    $scope.selectedDemography1 = {"obj":{}};
    $scope.selectedDemography2 = {"obj":{}};
    $scope.selectedDemography3 = {"obj":{}};
    $scope.selectedDemography4 = {"obj":{}};
    $scope.selectedDemography5 = {"obj":{}};
    $scope.selectedDemography6 = {"obj":{}};
    $scope.selectedDemography7 = {"obj":{}};
    $scope.selectedDemography8 = {"obj":{}};
    $scope.selectedDemography9 = {"obj":{}};
    $scope.selectedDemography10 = {"obj":{}};

    $scope.selectedItem1 = {"obj":{}};
    $scope.selectedItem2 = {"obj":{}};
    $scope.selectedItem3 = {"obj":{}};
    $scope.selectedItem4 = {"obj":{}};
    $scope.selectedItem5 = {"obj":{}};
    $scope.selectedItem6 = {"obj":{}};
    $scope.selectedItem7 = {"obj":{}};
    $scope.selectedItem8 = {"obj":{}};
    $scope.selectedItem9 = {"obj":{}};
    $scope.selectedItem10 = {"obj":{}};
    
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
    $scope.$watch('categoryName4', function() {
      $scope.searchByCategory();
    });
    $scope.$watch('categoryName5', function() {
      $scope.searchByCategory();
    });
    $scope.$watch('categoryName6', function() {
      $scope.searchByCategory();
    });
    $scope.$watch('categoryName7', function() {
      $scope.searchByCategory();
    });
    $scope.$watch('categoryName8', function() {
      $scope.searchByCategory();
    });
    $scope.$watch('categoryName9', function() {
      $scope.searchByCategory();
    });
    $scope.$watch('categoryName10', function() {
      $scope.searchByCategory();
    });

    $scope.$watch('recommendationScore', function() {
      $scope.doughnutRedraw();
    })

    $scope.searchByCategory = function(){
      var parameter_obj = {};

      if ($scope.categoryName1){
        Data.get_json('TopTen/v1/' + $scope.categoryName1, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories1 = api_data.Category;
        });
      }
      if ($scope.categoryName2){
        Data.get_json('TopTen/v1/' + $scope.categoryName2, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories2 = api_data.Category;
        });
      }
      if ($scope.categoryName3){
        Data.get_json('TopTen/v1/' + $scope.categoryName3, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories3 = api_data.Category;
        });
      }
      if ($scope.categoryName4){
        Data.get_json('TopTen/v1/' + $scope.categoryName4, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories4 = api_data.Category;
        });
      }
      if ($scope.categoryName5){
        Data.get_json('TopTen/v1/' + $scope.categoryName5, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories5 = api_data.Category;
        });
      }
      if ($scope.categoryName6){
        Data.get_json('TopTen/v1/' + $scope.categoryName6, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories6 = api_data.Category;
        });
      }
      if ($scope.categoryName7){
        Data.get_json('TopTen/v1/' + $scope.categoryName7, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories7 = api_data.Category;
        });
      }
      if ($scope.categoryName8){
        Data.get_json('TopTen/v1/' + $scope.categoryName8, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories8 = api_data.Category;
        });
      }
      if ($scope.categoryName9){
        Data.get_json('TopTen/v1/' + $scope.categoryName9, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories9 = api_data.Category;
        });
      }
      if ($scope.categoryName10){
        Data.get_json('TopTen/v1/' + $scope.categoryName10, parameter_obj).success(function(api_data){
        // Data.get_local('scripts/jsons/top_ten_mobile_apps.json').success(function(api_data){
          $scope.selectedCategories10 = api_data.Category;
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
        },{
          "category": $scope.categoryName4,
          "subCategory": $scope.selectedSubCategory4.obj.SubCategoryName,
          "demography": $scope.selectedDemography4.obj.DemographyName,
          "item": $scope.selectedItem4.obj
        },{
          "category": $scope.categoryName5,
          "subCategory": $scope.selectedSubCategory5.obj.SubCategoryName,
          "demography": $scope.selectedDemography5.obj.DemographyName,
          "item": $scope.selectedItem5.obj
        },{
          "category": $scope.categoryName6,
          "subCategory": $scope.selectedSubCategory6.obj.SubCategoryName,
          "demography": $scope.selectedDemography6.obj.DemographyName,
          "item": $scope.selectedItem6.obj
        },{
          "category": $scope.categoryName7,
          "subCategory": $scope.selectedSubCategory7.obj.SubCategoryName,
          "demography": $scope.selectedDemography7.obj.DemographyName,
          "item": $scope.selectedItem7.obj
        },{
          "category": $scope.categoryName8,
          "subCategory": $scope.selectedSubCategory8.obj.SubCategoryName,
          "demography": $scope.selectedDemography8.obj.DemographyName,
          "item": $scope.selectedItem8.obj
        },{
          "category": $scope.categoryName9,
          "subCategory": $scope.selectedSubCategory9.obj.SubCategoryName,
          "demography": $scope.selectedDemography9.obj.DemographyName,
          "item": $scope.selectedItem9.obj
        },{
          "category": $scope.categoryName10,
          "subCategory": $scope.selectedSubCategory10.obj.SubCategoryName,
          "demography": $scope.selectedDemography10.obj.DemographyName,
          "item": $scope.selectedItem10.obj
        }
      ];
      $scope.selectedItemsList.splice($scope.rowsToGenerate, 10 - $scope.rowsToGenerate);
      $scope.recommendationScore = $scope.computeScore();
      $scope.recommenderDoughnut = $scope.selectedItemsList;
      $scope.recommendationRating = $scope.computeRating($scope.recommendationScore);
    };

    $scope.computeScore = function(){
      var score = 0;
      for (var i = 0; i < $scope.selectedItemsList.length; i++) {
        $scope.selectedItemsList[i].item.Score = ($scope.rankScore($scope.selectedItemsList[i].item.Rank) * 10)/$scope.rowsToGenerate ;
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
    };

    $scope.doughnutRedraw = function(){
      $scope.data = [[{"length": 17, "height": 20, "y": 20}],
                  [{"length": 8, "height": 30, "y": 30}],
                  [{"length": 19, "height": 10, "y": 10}],
                  [{"length": 10, "height": 40, "y": 40}]];

    };
  });
