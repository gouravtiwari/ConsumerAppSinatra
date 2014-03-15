'use strict';

angular.module('publicApp')
  .controller('TopTenCtrl', function ($scope, Data) {
    
    $scope.categories = ['Movies', 'Television', 'Books', 'Mobile Apps', 'Video Games', 'Websites', 'Products', 'Music', 'Twitter TV'];
    $scope.categoryName = $scope.categories[0];
    categories_loader();
    
    function categories_loader(){
      Data.get_json('TopTen/v1/'+$scope.categoryName).success(function(api_data){
        $scope.subCategories =  api_data.Category[0].SubCategory;
        $scope.subCategoryName = $scope.subCategories[0];
        $scope.demographies = $scope.subCategories[0].Demographies;
        $scope.demography = $scope.demographies[0]
        data_loader();
      });  
    }

    function data_loader(){
      for (var i=0; i<$scope.subCategories.length; i++){
        if($scope.subCategories[i].SubCategoryName == $scope.subCategoryName.SubCategoryName){
          for (var j = 0; j < $scope.subCategories[i].Demographies.length; j++) {
            if ($scope.subCategories[i].Demographies[j].DemographyName == $scope.demography.DemographyName){
              $scope.items = $scope.subCategories[i].Demographies[j].Items;
              console.log($scope.items);
            }
          }
        }
      }
    }
    
    $scope.$watch('categoryName', function() {
      categories_loader();
    });

    $scope.$watch('demography', function() {
      console.log('hi')
      data_loader();
    });
  
    $scope.$watch('subCategoryName', function() {
      console.log('hi')
      data_loader();
    });
  });
