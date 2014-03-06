'use strict';

angular.module('publicApp', ['ngRoute'])
	.config(function ($routeProvider) {
    $routeProvider
			.when('/google_maps', {
			  templateUrl: 'views/google_maps.html',
			  controller: 'GoogleMapsCtrl'
			})
			.otherwise({
				redirectTo: '/'
			})
	});