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
			.otherwise({
				redirectTo: '/google_maps'
			})
	});