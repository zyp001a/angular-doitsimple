'use strict';

/* Controllers */

var eCtrlMain = 
			angular.module('eCtrlMain', ['eServCommon']);

eCtrlMain.controller('HomeCtrl',
  function($scope, Config, ServCommon) {
    $scope.include = ServCommon.getTemplateUrl('home');
  });

eCtrlMain.controller('AboutCtrl',
  function($scope, Config, ServCommon) {
    $scope.include = ServCommon.getTemplateUrl('about');
  });

eCtrlMain.controller('HeaderCtrl',
  function($scope, ServCommon){
    $scope.isActive = ServCommon.isActive;
  });
