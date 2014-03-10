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
			.when('/top_ten', {
			  templateUrl: 'views/top_ten.html',
			  controller: 'TopTenCtrl'
			})
			.otherwise({
				redirectTo: '/google_maps'
			})
	});