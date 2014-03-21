var defaultConfig = {
	type: 'listView'
};
var config;
var angularMod;
doit.module[defaultConfig.type] = {
	init: init
};

function validateConfig(configToVal){
	doit.validateConstantFields(configToVal, [
		'src'
	]);
}

function init(configToSet){
	console.log(configToSet);
	config = doit.extendConfig(defaultConfig, configToSet);
	config.srcConfig = doit.getConfig().modules[config.src];
	validateConfig(config);
	configToSet = config;

  angularMod = angular.module(config.name,['ngRoute', config.src]);
  angularMod.constant(config.name+'Config', config);
	initServ();
	initCtrl();
}

function initServ(){
}
function initCtrl(){
	angularMod.run([
		config.src+'Config', 'CommonServ', 
		function(Config, CommonServ){
			CommonServ.addRoute(Config.webRoot + '/list', 'ListCtrl');
		}]);
	angularMod.controller('ListCtrl', [
		'$scope',	config.src+'Config', config.name+'Config', config.src+'RESTServ', 'CommonServ', config.src+'Serv',
		function($scope, srcConfig, Config, RESTServ, CommonServ, SpecServ){
			$scope.include = CommonServ.getTemplateUrl('list');
			$scope.defaultEntityProp = CommonServ.toPropArray(srcConfig.emptyEntity);
			$scope.entities = RESTServ.query();
			console.log($scope.entities);
			$scope.entities.defaultEntity = srcConfig.emptyEntity;
			$scope.navigate = SpecServ.navigate;
			$scope.getUrl = SpecServ.getUrl;
			$scope.delete = RESTServ.deleteFromEntities;
		}]);	
}

