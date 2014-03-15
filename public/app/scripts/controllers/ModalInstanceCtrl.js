'use strict';

angular.module('publicApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
  	console.log("hi")
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
