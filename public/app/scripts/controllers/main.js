'use strict';

angular.module('publicApp')
  .controller('MainCtrl', function ($scope, $location, Data) {
    $scope.go = function(url) {
      $scope.showRecentSearch = false;
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
    $scope.viaRecentSearch = false;
    $scope.cache_response = {};

    $scope.recent_searches = Data.recent_searches;
    $scope.showRecentSearch = false;
    $scope.showList = function(){
      $scope.showRecentSearch = true;
    }

    $scope.hideList = function(){
      $scope.showRecentSearch = false;
    }

    $scope.loadRecentSearch = function(search){
      console.log(search);
      $scope.viaRecentSearch = true;
      $scope.go(search.location);
      //BELOW LINE MASHES UP SCREEN/SEARCH SPECIFIC INPUTS! 
      $.extend($scope.input, search.input);
      console.log($scope.input.pageno)
      $scope.cache_response = Data.in_cache(search.cache_url);
      console.log($scope.cache_response);
    }

    //BELOW OUTPUT MODEL MUST BE USED FOR ERROR/NOT FOUND MESSAGES
    $scope.output = {};


  });
