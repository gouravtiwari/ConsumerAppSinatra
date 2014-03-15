'use strict';

var app = angular.module('publicApp', ['google-maps', 'ui.bootstrap'])
	.config(function ($routeProvider) {
    $routeProvider
    	.when('/', {
			  templateUrl: 'views/landing_page.html'
			})
			.when('/nav_page', {
			  templateUrl: 'views/nav_page.html',
			  controller: 'NavPageCtrl'
			})
			.when('/google_maps', {
			  templateUrl: 'views/google_maps.html',
			  controller: 'GoogleMapsCtrl'
			})
			.when('/product_by_desc', {
			  templateUrl: 'views/product_by_desc.html',
			  controller: 'ProductReferenceCtrl'
			})
			.when('/store_by_name', {
			  templateUrl: 'views/store_by_name.html',
			  controller: 'StoreCtrl'
			})
			.when('/ad_spend', {
			  templateUrl: 'views/ad_spend.html',
			  controller: 'AdSpendCtrl'
			})
			.when('/top_ten', {
			  templateUrl: 'views/top_ten.html',
			  controller: 'TopTenCtrl'
			})
			.when('/audience', {
			  templateUrl: 'views/audience.html',
			  controller: 'AudienceCtrl'
			})
			.when('/mobile-audience', {
			  templateUrl: 'views/mobile-audience.html',
			  controller: 'MobileAudienceCtrl'
			})
			.when('/market_share', {
			  templateUrl: 'views/market_share.html',
			  controller: 'MarketShareCtrl'
			})
			.when('/program_rankings', {
			  templateUrl: 'views/program_rankings.html',
			  controller: 'ProgramRankingsCtrl'
			})
			.when('/segmentation', {
			  templateUrl: 'views/segmentation.html',
			  controller: 'SegmentCtrl'
			})
			.when('/market_analysis', {
			  templateUrl: 'views/market_analysis.html',
			  controller: 'MarketAnalysisCtrl'
			})
			.when('/compare', {
			  templateUrl: 'views/compare.html',
			  controller: 'CompareCtrl'
			})
			.when('/recommender', {
			  templateUrl: 'views/recommender.html',
			  controller: 'RecommenderCtrl'
			})
			.otherwise({
				redirectTo: '/'
			})
	});

app.filter('unsafe', ['$sce', function ($sce) {
    return function (val) {
    	console.log(val)
      return $sce.trustAsHtml(val);
    };
}]);

app.filter('reverse', function() {
  return function(array) {
  	var arrayCopy = [].concat(array);
    return arrayCopy.reverse();
  };
});