'use strict';

angular.module('publicApp')
  .controller('TopTenCtrl', function ($scope, Data, PieChartOptions) {
    
    $scope.categories = ['Movies', 'Television', 'Books', 'Mobile Apps', 'Video Games', 'Websites', 'Products', 'Music', 'Twitter TV'];
    $scope.category_attribute = ['Sales', 'Projection', 'SalesCount', 'UniqueAudience', 'UAFC', 'UniqueAudience', 'UniqueAudience']
    $scope.input.categoryName = $scope.input.categoryName || $scope.categories[0];
    categories_loader();
    
    function categories_loader(){
      Data.get_json('TopTen/v1/'+$scope.input.categoryName).success(function(api_data){
        $scope.subCategories =  api_data.Category[0].SubCategory;
        $scope.input.subCategoryName = $scope.subCategories[0];
        $scope.demographies = $scope.subCategories[0].Demographies;
        $scope.input.demography = $scope.demographies[0]
        data_loader_top_ten();
      });  
    }

    if($scope.viaRecentSearch) {
      if($scope.cache_response.Category && $scope.cache_response.Category[0].SubCategory){
        $scope.subCategories =  $scope.cache_response.Category[0].SubCategory;
        $scope.input.subCategoryName = $scope.subCategories[0];
        $scope.demographies = $scope.subCategories[0].Demographies;
        $scope.input.demography = $scope.demographies[0]
        data_loader_top_ten();
      }
      $scope.viaRecentSearch = false;
    }

    $scope.$watch('cache_response', function(newValue, oldValue){
      if(newValue == oldValue) { return; }
      if($scope.cache_response.Category && $scope.cache_response.Category[0].SubCategory) {
        $scope.subCategories =  $scope.cache_response.Category[0].SubCategory;
        $scope.input.subCategoryName = $scope.subCategories[0];
        $scope.demographies = $scope.subCategories[0].Demographies;
        $scope.input.demography = $scope.demographies[0]
        data_loader_top_ten();
      }
    });

    function data_loader_top_ten(){
      if ($scope.subCategories){
        for (var i=0; i<$scope.subCategories.length; i++){
          if($scope.subCategories[i].SubCategoryName == $scope.input.subCategoryName.SubCategoryName){
            for (var j = 0; j < $scope.subCategories[i].Demographies.length; j++) {
              if ($scope.subCategories[i].Demographies[j].DemographyName == $scope.input.demography.DemographyName){
                $scope.items = $scope.subCategories[i].Demographies[j].Items;
                if($scope.input.categoryName != 'Music' || $scope.input.categoryName != 'Twitter TV'){
                  console.log($scope.items)
                  plot_graph_top_ten($scope.items);
                }
              }
            }
          }
        }
      } 
    }
    
    $scope.$watch('input.categoryName', function(newvalue, oldvalue) {
      if(!newvalue || newvalue == oldvalue) return;
      categories_loader();
    });

    $scope.$watch('input.demography', function(newvalue, oldvalue) {
      if(!newvalue || newvalue == oldvalue) return;
      data_loader_top_ten();
    });
  
    $scope.$watch('input.subCategoryName', function(newvalue, oldvalue) {
      if(!newvalue || newvalue == oldvalue) return;
      data_loader_top_ten();
    });

    //Pie Chart for top 10
    function get_series_data_top_ten(api_data, chosen_attr){
      var colorsArray = ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#AFA263', '#6AF9C4', '#25ADA7','#A1D87F','#FF453C','#EFC94C','#AF709A','#FFD530', '#0E229B', 'orange'];
      var series_data = []
      var total_this_stat = $.map(api_data, function(x){return +x.Sales}).reduce(function(previousValue, currentValue){ return previousValue + currentValue;})
      console.log(total_this_stat);
      var i = 0;
      for(var each_stat in api_data){
        var s = api_data[each_stat];
        series_data.push({
          name : s.Name,
          percent_y :+(+(s[chosen_attr])/total_this_stat*100).toFixed(1),
          y : +(s[chosen_attr]),
          color : colorsArray[i++]
        });
      }
      console.log(series_data);
      return series_data;
    }

    function plot_graph_top_ten(data){
      console.log(data)
      var chosen_attr = $scope.category_attribute[$scope.categories.indexOf($scope.input.categoryName)]
      var api_data = data;

      var series_data = get_series_data_top_ten(api_data,chosen_attr);
      var chart_data = angular.copy(PieChartOptions.simplePie);
      chart_data.series = [{name:'Data', type: 'pie', data:series_data}];
      console.log(chart_data.series);
      chart_data.plotOptions.pie.center = ['50%', '50%'];
      chart_data.chart.marginTop = chart_data.chart.marginBottom = 50;
      console.log(chart_data)
      $scope['chosenStat'] = chart_data;
    }
  });
