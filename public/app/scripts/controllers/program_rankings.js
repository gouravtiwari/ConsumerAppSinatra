'use strict';

angular.module('publicApp')
  .controller('ProgramRankingsCtrl', function ($scope, Data) {
    $scope.demographies = ['M2-11'];
    $scope.$watch('programs', function() {
      $scope.doughnutRedraw();
    });
    $scope.search = function(){
      var parameter_obj = {
                            "noofresults": $scope.input.numberofresults,
                            "demographies": $scope.input.demography
                          };
      // demographies=M2-11&originator=TURNER NEEDs to be added
      // Data.get_json('NationalTV/v1/', parameter_obj).success(function(api_data){
      Data.get_local('scripts/jsons/program_rankings.json').success(function(api_data){
        $scope.programs = api_data.NationalTVRanking.Programs;
      });
    };

    $scope.doughnutRedraw = function(){
      $scope.totalUSProjection = 0;
      if($scope.programs != undefined && $scope.programs != null && $scope.programs.toString() != 'NaN'){
        $scope.data = { 'list': [], 
                        'output': '',
                        'value': '',
                        'outputColor': '#000000',
                        'outputValueColor': '#45C0B6',
                        'tipLabel': 'Projected Audience',
                        'tipLabelUnit': ''
                      };
        for (var i = 0; i < $scope.programs.length; i++) {
          $scope.data.list[i] = {'label': '#'+(i+1)+'. '+$scope.programs[i].ProgramName + '<br>' + 
                                      "Originator: " + $scope.programs[i].Originator + '<br>' +
                                      "US AA %: " + $scope.programs[i].US_AA_PERC,
                            'value': parseInt($scope.programs[i].USProjection)};
          console.log(parseInt($scope.programs[i].USProjection));
          console.log(i);
          console.log($scope.totalUSProjection);
          $scope.totalUSProjection = $scope.totalUSProjection + parseInt($scope.programs[i].USProjection);
        };
      }
    };

    
  });
