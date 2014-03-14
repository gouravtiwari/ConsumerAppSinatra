'use strict';

angular.module('publicApp')
  .controller('MainCtrl', function ($scope, $location, Data) {
    $scope.go = function(url) {
    	$location.path(url);
    }

    $scope.navTiles = [
    	{title: 'Product <br/> Finder', url: '/product_by_desc'},
    	{title: 'Store <br/> Locator', url: '/store_by_name'},
    	{title: 'Market Analyses', url: '/market_analysis'},
    	{title: 'Compare Smartly!', url: '/compare'}
    ];

    $scope.analyses = [
      {name: 'Top 10 Products', url: '/top_ten'},
    	{name: 'Market <br/> Share', url: '/market_share'},
    	{name: 'Online Audience', url: '/audience'},
    	{name: 'Mobile Audience', url: '/mobile-audience'},
    	{name: 'Ad <br/> Spend', url: '/ad_spend'},
    	{name: 'TV Programs Rankings', url: '/program_rankings'}
    ];

    //BELOW INPUT MODEL MUST BE USED ACROSS ALL CTRLs FOR RECENT SEARCHES LOGIC!!! 
    $scope.input = {};

    $scope.recent_searches = Data.recent_searches;
    $scope.showRecentSearch = false;
    $scope.toggle = function(){
      console.log('hi')
      $scope.showRecentSearch = !$scope.showRecentSearch;
    }



  });
