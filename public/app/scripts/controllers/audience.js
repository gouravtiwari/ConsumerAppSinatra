'use strict';

angular.module('publicApp')
  .controller('AudienceCtrl', function ($scope, Data) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Data.get_local('scripts/jsons/audience.json').success(function(api_data){
    	$scope.netUsageData = api_data.NetUsage[0].WebsiteCategory[0].WebSiteInfo;
    });
  });
