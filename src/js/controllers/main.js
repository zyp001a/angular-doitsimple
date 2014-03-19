'use strict';

/* Controllers */

var eCtrlMain = 
			angular.module('eCtrlMain', ['eServCommon']);

eCtrlMain.controller('HomeCtrl',
  function($scope, Config, CommonServ) {
    $scope.include = CommonServ.getTemplateUrl('home');
  });

eCtrlMain.controller('AboutCtrl',
  function($scope, Config, CommonServ) {
    $scope.include = CommonServ.getTemplateUrl('about');
  });

eCtrlMain.controller('HeaderCtrl',
  function($scope, CommonServ){
    $scope.isActive = CommonServ.isActive;
  });
