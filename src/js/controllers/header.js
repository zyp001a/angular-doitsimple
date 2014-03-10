'use strict';

/* Controllers */

var eveHeaderController = 
			angular.module('eveHeaderController', 
										 ['eveConfig', 'eveCommonUtils']);
eveHeaderController.controller('HeaderCtrl',
  function($scope, CommonUtils){
    $scope.isActive = CommonUtils.isActive;
  });
