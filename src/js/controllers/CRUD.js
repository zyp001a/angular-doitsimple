'use strict';

/* Controllers */

var eCtrlCRUD = 
			angular.module('eCtrlCRUD', ['eServCommon', 'eServREST']);

eCtrlCRUD.run(function(CommonServ){
	CommonServ.addRoute("/add", {
		template: '<div ng-include="include"></div>',
		controller: 'AddCtrl'
	});
});


eCtrlCRUD.controller('AddCtrl', 
  function($scope, Config, CommonServ, RESTServ) {
    $scope.include = CommonServ.getTemplateUrl('modify');
    $scope.entity = Config.getDefaultEntity();
    $scope.utils = CommonServ;
		$scope.saveEntity = function(){
			console.log(Config.getDefaultEntity());
//			CommonServ.addEntityAndRedirect($scope.entity);
		};
  });



/*
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

*/
