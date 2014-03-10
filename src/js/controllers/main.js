'use strict';

/* Controllers */

var eveMainController = 
			angular.module('eveMainController', 
										 ['eveConfig', 'eveCommonUtils']);

eveMainController.controller('HomeCtrl',
  function($scope, $route, $location, Config, CommonUtils) {
    $scope.include = 
			Config.templateUrls.home || Config.getTemplateUrls('home');
    $scope.utils = CommonUtils;
  });


eveMainController.controller('AddCtrl', 
  function($scope, $route, $location, Config, CommonUtils) {
    $scope.include = 
			Config.templateUrls.modify || Config.getTemplateUrls('modify');

    $scope.entity = Config.getDefaultEntity();
    $scope.utils = CommonUtils;
		$scope.saveEntity = function(){
			console.log(Config.getDefaultEntity());
			CommonUtils.addEntityAndRedirect($scope.entity);
		};

  });

eveMainController.controller('EditCtrl', 
  function($scope, $routeParams, $location, Config, RestfulAPI, CommonUtils) {
    $scope.include = 
			Config.templateUrls.modify || Config.getTemplateUrls('modify');

		$scope.utils = CommonUtils;		
		$scope.entity = RestfulAPI.get({id: $routeParams.id}, 
			function(){
				$scope.entity._id = $routeParams.id;
//				console.log($scope.entity);
				$scope.saveEntity = function(){
					CommonUtils.updateEntityAndRedirect($scope.entity);
				};
			});
  });


eveMainController.controller('ListCtrl', 
  function($scope, Config, RestfulAPI, CommonUtils){
    $scope.include = 
			Config.templateUrls.list || Config.getTemplateUrls('list');
		$scope.defaultEntityProp = CommonUtils.toPropArray(Config.defaultEntity);
    $scope.entities = RestfulAPI.query();
		$scope.entities.defaultEntity = Config.getDefaultEntity();
    $scope.utils = CommonUtils;
  });

eveMainController.controller('DetailCtrl', 
  function($scope, $routeParams, Config, RestfulAPI, CommonUtils) {
    $scope.include = 
			Config.templateUrls.detail || Config.getTemplateUrls('detail');

    $scope.entity = RestfulAPI.get({id: $routeParams.id}, 
			function(){
				$scope.utils = CommonUtils;		
			});	
	});


