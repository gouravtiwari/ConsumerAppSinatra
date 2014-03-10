'use strict';

angular.module('publicApp', ['ngRoute', 'google-maps'])
	.config(function ($routeProvider) {
    $routeProvider
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
			.otherwise({
				redirectTo: '/google_maps'
			})
	});