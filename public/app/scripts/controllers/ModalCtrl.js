'use strict';

angular.module('publicApp')
  .controller('ModalCtrl', function ($scope, Data) {
    
    $scope.obj = Data.get_search_data();
    
    $scope.setGeoLocation = function(){
    	getLocation();
    }

    $scope.setCustomLocation = function(){
    	$scope.obj.lat = $scope.latitude;
    	$scope.obj.long = $scope.longitude;
    	Data.set_search_data($scope.obj);
    }

    function getLocation(){
	    if (navigator.geolocation){
	      navigator.geolocation.getCurrentPosition(showPosition);
	    }
	    else{
	      x.innerHTML="Geolocation is not supported by this browser.";
	    }
	  }

	  function showPosition(position){
	    $scope.geolocation = {'lat': position.coords.latitude, 'long': position.coords.longitude};    
	  }
  });