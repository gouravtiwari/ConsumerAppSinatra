'use strict';

angular.module('publicApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.go = function(url) {
    	$location.path(url);
    }

    $scope.navTiles = [
    	{title: 'Top 10 Products', url: '/top_ten'},
    	{title: 'Product <br/> Finder', url: '/product_by_desc'},
    	{title: 'Store <br/> Locator', url: '/store_by_name'},
    	{title: 'Analyse Smartly!', url: '/market_analysis'},
    	{title: 'Compare Smartly!', url: '/compare'},
    	{title: 'Recent <br/> Search', url: '/recent_search'}
    ];

    $scope.analyses = [
    	{name: 'Market <br/> Share', url: '/market_share'},
    	{name: 'Online Audience', url: '/audience'},
    	{name: 'Mobile Audience', url: '/mobile-audience'},
    	{name: 'Ad <br/> Spend', url: '/ad_spend'},
    	{name: 'TV Programs Rankings', url: '/program_rankings'}
    ];

  });
