'use strict';

angular.module('publicApp')
  .controller('ProgramRankingsCtrl', function ($scope, Data) {
    $scope.sortByFields = [];
    $scope.sortBy = 'US_AA_PERC';
    $scope.demographies = ['M2-11'];
    $scope.$watch('programs', function() {
      if($scope.programs){
        $scope.doughnutRedraw();
      }
    });
    $scope.search = function(){
      var parameter_obj = {
                            "noofresults": $scope.input.numberofresults,
                            "demographies": $scope.input.demography
                          };
      // demographies=M2-11&originator=TURNER NEEDs to be added
      Data.get_json('NationalTV/v1/', parameter_obj).success(function(api_data){
      //Data.get_local('scripts/jsons/program_rankings.json').success(function(api_data){
        if(!api_data.NationalTVRanking.Programs) {
          $scope.output.message = "No Record found for the provided input";
          $scope.programs = [];
        } else {
          $scope.output.message = '';
          $scope.programs = api_data.NationalTVRanking.Programs;
          $scope.sortByFields = Data.fillSortByFields($scope.programs[0]);
          Data.injectColorClass($scope.programs, $scope.sortByFields);  
        }
      });
    };

    if($scope.viaRecentSearch) {
      if($scope.cache_response.NationalTVRanking && !$scope.cache_response.NationalTVRanking.Programs) {
        $scope.output.message = "No Record found for the provided input";
        $scope.netUsageData = '';
      } else {
        if($scope.cache_response.NationalTVRanking && $scope.cache_response.NationalTVRanking.Programs){
          $scope.programs = $scope.cache_response.NationalTVRanking.Programs;
          $scope.sortByFields = Data.fillSortByFields($scope.programs[0]);
          Data.injectColorClass($scope.programs, $scope.sortByFields);
          $scope.output.message = '';
        }else{
          $scope.output.message = "No Record found for the provided input";
          $scope.netUsageData = '';
        }

      }
      $scope.viaRecentSearch = false;
    }

    $scope.$watch('cache_response', function(newValue, oldValue){
      if(newValue == oldValue) { return; }
      if($scope.cache_response.NationalTVRanking) {
        if(!$scope.cache_response.NationalTVRanking.Programs) {
          $scope.output.message = "No Record found for the provided input";
          $scope.netUsageData = '';
        } else {
          $scope.netUsageData = $scope.cache_response.NationalTVRanking.Programs;
          $scope.output.message = '';
        }
      }
    });

    $scope.$watch('sortBy', function(newvalue, oldvalue){
      console.log(newvalue)
      if(!newvalue || newvalue == oldvalue) return;
      $scope.programs = Data.sortBy(newvalue, $scope.programs);
    });

    $scope.doughnutRedraw = function(){
      $scope.totalUSProjection = 0;
      if($scope.programs != undefined && $scope.programs != null && $scope.programs.toString() != 'NaN'){
        $scope.data = { 'list': [], 
                        'output': '',
                        'value': '',
                        'outputColor': '#000000',
                        'outputValueColor': '#45C0B6',
                        'tipLabel': 'Projected Audience',
                        'tipLabelUnit': '',
                        'legend': true,
                        'width': 350,
                        'height': 350,
                        'innerRadius': 0,
                        'outerRadius': 120,
                        'animate': false
                      };
        for (var i = 0; i < $scope.programs.length; i++) {
          $scope.data.list[i] = {'label': $scope.programs[i].ProgramName + '<br>' + 
                                      "Originator: " + $scope.programs[i].Originator + '<br>' +
                                      "US AA %: " + $scope.programs[i].US_AA_PERC,
                            'value': parseInt($scope.programs[i].USProjection)};
          $scope.totalUSProjection = $scope.totalUSProjection + parseInt($scope.programs[i].USProjection);
        };
      }
    };

    
  });
