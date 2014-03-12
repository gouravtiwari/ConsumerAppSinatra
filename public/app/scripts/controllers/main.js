'use strict';

angular.module('publicApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.go = function(url) {
    	$location.path(url);
    }

    $scope.navTiles = [
    	{title: 'Top 10 Products', url: '/top_ten'},
    	{title: 'Search Product', url: '/product_by_desc'},
    	{title: 'Search <br/> Store', url: '/store_by_name'},
    	{title: 'Analyse Smartly!', url: '/market_analysis'},
    	{title: 'Compare Smartly!', url: '/compare'},
    	{title: 'Recent <br/> Search', url: '/recent_search'}
    ];

  });
