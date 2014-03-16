'use strict';

angular.module('publicApp')
  .controller('ProgramRankingsCtrl', function ($scope, Data) {
    $scope.search = function(){
      var parameter_obj = {
                            "noofresults": $scope.input.numberofresults,
                            "demographies": $scope.input.demography
                          };
      // demographies=M2-11&originator=TURNER NEEDs to be added
      Data.get_json('NationalTV/v1/', parameter_obj).success(function(api_data){
      // Data.get_local('scripts/jsons/program_rankings.json').success(function(api_data){
        $scope.programs = api_data.NationalTVRanking.Programs;
      });
  
    };
    
  });
