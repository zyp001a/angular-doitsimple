var defaultConfig = {
	type: 'listView'
};

doit.module[defaultConfig.type] = {
	init: init
};

function validateConfig(configToVal){
	doit.validateConstantFields(configToVal, [
		'src'
	]);
}

function init(configToSet){
//	console.log(configToSet);
	var config = doit.extendConfig(defaultConfig, configToSet);
	config.srcConfig = doit.getConfig().modules[config.src];
	validateConfig(config);
	configToSet = config;

	
	var angularMod = angular.module(config.name,['ngRoute', config.src]);
  angularMod.constant(config.name+'Config', config);
	initServ(config, angularMod);
	initCtrl(config, angularMod);
}

function initServ(config, angularMod){
}
function initCtrl(config, angularMod){
	angularMod.run([
		config.src+'Config', 'CommonServ', 
		function(Config, CommonServ){
			CommonServ.addRoute(Config.webRoot + '/list', config.name+'ListCtrl');
		}]);
	angularMod.controller(config.name+'ListCtrl', [
		'$scope',	config.src+'Config', config.name+'Config', config.src+'RESTServ', 'CommonServ', config.src+'Serv',
		function($scope, srcConfig, Config, RESTServ, CommonServ, SpecServ){

			$scope.include = CommonServ.getTemplateUrl('list');
			$scope.defaultEntityProp = CommonServ.toPropArray(srcConfig.emptyEntity);
			$scope.entities = RESTServ.query();
//			console.log($scope.entities);
			$scope.entities.defaultEntity = srcConfig.emptyEntity;
			$scope.navigate = SpecServ.navigate;
			$scope.getUrl = SpecServ.getUrl;
			$scope.delete = RESTServ.deleteFromEntities;
		}]);	
}

