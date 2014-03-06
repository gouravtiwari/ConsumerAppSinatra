'use strict';

angular.module('publicApp', ['ngRoute', 'google-maps'])
	.config(function ($routeProvider) {
    $routeProvider
			.when('/google_maps', {
			  templateUrl: 'views/google_maps.html',
			  controller: 'GoogleMapsCtrl'
			})
			.otherwise({
				redirectTo: '/google_maps'
			})
	});