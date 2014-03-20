'use strict';

/* Controllers */

var eCtrlSearch = 
			angular.module('eCtrlSearch', ['eServCommon', 'eServREST']);

eCtrlSearch.run(function(ServCommon){
	ServCommon.addRoute("/search", 'SearchCtrl');
});

eCtrlSearch.controller('SearchCtrl', 
  function($scope, Config, ServREST, ServCommon){
    $scope.include = ServCommon.getTemplateUrl('list');
		$scope.defaultEntityProp = ServCommon.toPropArray(Config.getDefaultEntity());
    $scope.entities = ServREST.query();
		console.log($scope.entities);
		$scope.entities.defaultEntity = Config.getDefaultEntity();
    $scope.navigate = ServCommon.navigate;
    $scope.getUrl = ServCommon.getUrl;
    $scope.delete = ServREST.deleteFromEntities;
  });

