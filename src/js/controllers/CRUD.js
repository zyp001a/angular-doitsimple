'use strict';

/* Controllers */

var eCtrlCRUD = 
			angular.module('eCtrlCRUD', ['eServCommon', 'eServREST']);

eCtrlCRUD.run(function(ServCommon){
	ServCommon.addRoute('/create', 'CreateCtrl');
	ServCommon.addRoute('/update/:id', 'UpdateCtrl');
	ServCommon.addRoute('/read/:id', 'ReadCtrl');
});

eCtrlCRUD.controller('CreateCtrl', 
  function($scope, Config, ServCommon, ServREST) {
    $scope.include = ServCommon.getTemplateUrl('modify');
    $scope.entity = Config.getDefaultEntity();
    $scope.utils = ServCommon;
		$scope.saveEntity = function(){
			ServREST.createAndReadEntity($scope.entity);
		};
  });


eCtrlCRUD.controller('UpdateCtrl', 
  function($scope, $routeParams, ServCommon, ServREST) {
    $scope.include = ServCommon.getTemplateUrl('modify');
		$scope.utils = ServCommon;		
		$scope.entity = ServREST.get({id: $routeParams.id}, 
			function(entity){
				entity._id = $routeParams.id;
				$scope.saveEntity = function(){
					ServREST.updateAndReadEntity(entity);
				};
			});
  });

eCtrlCRUD.controller('ReadCtrl', 
  function($scope, $routeParams, ServCommon, ServREST) {
    $scope.include = ServCommon.getTemplateUrl('detail');

    $scope.entity = ServREST.get({id: $routeParams.id}, 
			function(){
				$scope.utils = ServCommon;		
			});	
	});


