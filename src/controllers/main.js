'use strict';

/* Controllers */

var eveMainController = 
			angular.module('eveMainController', 
										 ['eveConfig', 'eveCommonUtils']);

eveMainController.controller('HomeCtrl',
  function($scope, $route, $location, Config, CommonUtils) {
    $scope.include=Config.templateUrls.home;
    $scope.utils = CommonUtils;
  });


eveMainController.controller('AddCtrl', 
  function($scope, $route, $location, Config, CommonUtils) {
		$scope.include=Config.templateUrls.modify;
    $scope.entity = Config.defaultEntity;
    $scope.utils = CommonUtils;
		$scope.saveEntity = function(){
			CommonUtils.addEntityAndRedirect($scope.entity);
		};

  });

eveMainController.controller('EditCtrl', 
  function($scope, $routeParams, $location, Config, RestfulAPI, CommonUtils) {
		$scope.include=Config.templateUrls.modify;
		$scope.utils = CommonUtils;		
		$scope.entity = RestfulAPI.get({id: $routeParams.id}, 
			function(){
				console.log($scope.entity);
				$scope.saveEntity = function(){
					CommonUtils.updateEntityAndRedirect($scope.entity);
				};
			});
  });


eveMainController.controller('ListCtrl', 
  function($scope, Config, RestfulAPI, CommonUtils){
		$scope.include=Config.templateUrls.list;
    $scope.entities = RestfulAPI.query();
    $scope.utils = CommonUtils;
  });

eveMainController.controller('DetailCtrl', 
  function($scope, $routeParams, Config, RestfulAPI, CommonUtils) {
		$scope.include=Config.templateUrls.detail;
    $scope.entity = RestfulAPI.get({id: $routeParams.id}, 
			function(){
				$scope.utils = CommonUtils;		
			});	
	});


