'use strict';

/* Controllers */

var eCtrlSearch = 
			angular.module('eCtrlSearch', ['eServCommon', 'eServREST']);

eCtrlSearch.run(function(CommonServ, Config){
	CommonServ.addRoute(Config.webRoot + "/search", {
		template: '<div ng-include="include"></div>',
		controller: 'SearchCtrl'
	});
});

eCtrlSearch.controller('SearchCtrl', 
  function($scope, Config, RESTServ, CommonServ){
    $scope.include = CommonServ.getTemplateUrl('list');
		$scope.defaultEntityProp = CommonServ.toPropArray(Config.defaultEntity);
    $scope.entities = RESTServ.query();
		$scope.entities.defaultEntity = Config.getDefaultEntity();
    $scope.utils = CommonServ;
  });

