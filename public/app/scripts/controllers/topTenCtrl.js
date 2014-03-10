'use strict';

angular.module('publicApp')
  .controller('TopTenCtrl', function ($scope, Data) {
    
    $scope.input = {Description: 'Search Categories...'};

    Data.get_local('scripts/jsons/top_ten.json').success(function(api_data){
      $scope.categories = api_data.Category;
    });

  });
