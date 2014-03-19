'use strict';

angular.module('publicApp')
  .controller('ModalCtrl', function ($scope, Data, $location) {
    
    $scope.obj = Data.get_search_data();
    $scope.radioModel = 'CurrentLocation'
    $scope.view = true;
    $scope.haveData = 'false';
    
    $scope.setGeoLocation = function(){
    	window.navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                $scope.geolocation = {'lat': position.coords.latitude, 'long': position.coords.longitude};
                $scope.haveData = 'true';       
            });
        }, function(error) {
            alert(error);
        });
    }

    $scope.viewChange = function(type){
        if(type=='CurrentLocation'){
            $scope.view = true;
        }
        else{
            $scope.view = false;
        }
    }

    $scope.setCustomLocation = function(lat, long){
    	$scope.obj.lat = lat;
    	$scope.obj.long = long;
        if(lat != undefined && long != undefined){
            Data.set_search_data($scope.obj);
            $scope.ok();
        }
        else{
            alert('Sorry no address found')
        }
    	
    }

    $scope.doSearch = function(){
        if($scope.location === ''){
            alert('Directive did not update the location property in parent controller.');
        } else {
            $scope.setCustomLocation($scope.location.split(',')[0],$scope.location.split(',')[1])
        }
    };
	    
  });

