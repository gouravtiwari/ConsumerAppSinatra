'use strict';

angular.module('publicApp')
  .controller('MainCtrl', function ($scope, $location, Data) {

    $scope.navTiles = [
      {title: 'Product <br/> Finder', url: '/product_by_desc', img: 'icon_findProducts.png'},
      {title: 'Store <br/> Locator', url: '/store_by_name', img: 'icon_storeLocator.png'},
      {title: 'Market Analysis', url: '/market_analysis', img: 'icon_analyseSmartly.png'}
    ];

    $scope.analyses = [      
      // {name: 'Ad Spend Recommender', url: '/recommender', class: "feature"},
      // {name: 'Ad <br/> Spend', url: '/ad_spend'},
      // {name: 'Compare Smartly!', url: '/compare', class: "feature"},
      {name: 'Top 10 Products', url: '/top_ten'},
      {name: 'Online Audience', url: '/audience'},
      {name: 'Mobile Audience', url: '/mobile-audience'},
      {name: 'TV Programs Rankings', url: '/program_rankings'},
      {name: 'Lifestyle Segmentation', url: '/segmentation'},
      {name: 'Market <br/> Share', url: '/market_share'}
    ];

    $scope.location = $location.path();
    console.log($scope.location);
    $scope.go = function(url) {
      $scope.showRecentSearch = false;
    	$location.path(url);
    }

    $scope.$watch(function(){return $location.path()}, function(newvalue, oldvalue){
      if(!newvalue || newvalue == oldvalue) return;
      $scope.location = '';
      $.each($scope.analyses, function(index, analysis){
        if(analysis.url == newvalue) {
          $scope.location = '/market_analysis';
        }
      });
      if(!$scope.location) {
        $scope.location = newvalue;
      }
      console.log($scope.location);
    });

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

    $scope.loadRecentSearch = function(search, index){
      console.log(search);
      $scope.viaRecentSearch = true;
      $scope.go(search.location);
      //BELOW LINE MASHES UP SCREEN/SEARCH SPECIFIC INPUTS! 
      $.extend($scope.input, search.input);
      $scope.cache_response = Data.in_cache(search.cache_url);
      console.log($scope.cache_response);
      Data.recent_searches.splice(Data.recent_searches.length - index - 1, 1);
      Data.recent_searches.splice(Data.recent_searches.length, 0, search);
    }

    //BELOW OUTPUT MODEL MUST BE USED FOR ERROR/NOT FOUND MESSAGES
    $scope.output = {};

    //Expose Math Object for rounding in {{}}
    $scope.Math = window.Math;

    $scope.marketAnalysisSection = function(location){
      var isMarketAnalysisSection = false;
      isMarketAnalysisSection = location == '/market_analysis' || 
                                $.grep($scope.analyses, function(n) { return n.url == location; }).length > 0;
      return isMarketAnalysisSection;
    }

  });
