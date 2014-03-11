'use strict';

angular.module('publicApp')
  .controller('ProgramRankingsCtrl', function ($scope, Data) {
    Data.get_local('scripts/jsons/program_rankings.json').success(function(api_data){
      $scope.programs = api_data.NationalTVRanking.Programs;
    });
  });
