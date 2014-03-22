
var defaultConfig = {
	type: 'restView',
	tokenField: 'access_token'
};

doit.module[defaultConfig.type] = {
	init: init
};
function validateEnv(){
};

function validateConfig(configToVal){
	doit.validateConstantFields(configToVal, [
		'apiRoot',
		'webRoot',
		'emptyEntity'
	]);
}

function init(configToSet){
//	console.log(configToSet);
	var config = doit.extendConfig(defaultConfig, configToSet);
	validateConfig(config);
	configToSet = config;

  var angularMod = angular.module(config.name, ['ngRoute', 'ngResource']);
  angularMod.constant(config.name+'Config', config);
	initServ(config, angularMod);
	initCtrl(config, angularMod);
}

function initServ(config, angularMod){
	console.log('rest init: '+config.name);
	angularMod.factory(config.name+'Serv', [
		'$location', config.name+'Config', 'CommonServ',
		function($location, SpecConfig, CommonServ){
			return {
				navigate: function(url){
					$location.path(SpecConfig.webRoot + url);
				},
				getUrl: function(url){
					return '#'+SpecConfig.webRoot + url;
				}
			};
		}]);
	angularMod.factory(config.name+'RESTServ', [
		'$resource', config.name+'Config', 'CommonServ', config.name+'Serv',
		function($resource, Config, CommonServ, SpecServ){
			var token_json={};
			var restToken = Config.tokenField;
			var restRoot = Config.apiRoot;
			console.log(Config.apiRoot);
			if(restToken){
				token_json[restToken] = "token1";
			}
			if(restRoot){
				var api = $resource(restRoot + '/:id', token_json, {
					'update': { method:'PUT'}
				});
				api.createAndReadEntity = function(entity){
					api.save(entity, function(entity){
						SpecServ.navigate("/read/"+entity._id);
					});
				};
				api.updateAndReadEntity = function(entity){
					var id = entity._id;
					api.update({id:id}, entity, function(entity){
						SpecServ.navigate("/read/"+entity._id);
					});
				};
				api.deleteEntityAndSearch = function(entity){
					api.delete({id:entity._id}, function(entity){
						SpecServ.navigate("/search");
					});
				};
				api.createEntity = function(entity){
					api.save(entity);
				};
				api.updateEntity = function(entity){
					api.update({id:entity._id}, entity);
				};
				api.deleteEntity = function(entity){
					api.delete({id:entity._id});
				};
				api.deleteFromEntities = function(entities, index){
					api.delete({id:entities[index]._id}, function(){
						entities.splice(index, 1);
					});
				};
				return api;	
			}
			else{
				console.log("no REST root");
				return null;
			}
		}]);


	
}
function initCtrl(config, angularMod){
	angularMod.run([
		config.name+'Config', 'CommonServ', 
		function(Config, CommonServ){
			CommonServ.addRoute(Config.webRoot + '/create', config.name+'CreateCtrl');
			CommonServ.addRoute(Config.webRoot + '/update/:id', config.name+'UpdateCtrl');
			CommonServ.addRoute(Config.webRoot + '/read/:id', config.name+'ReadCtrl');
		}]); 

	angularMod.controller(config.name+'CreateCtrl', [
		'$scope', config.name+'Config', 'CommonServ', config.name+'RESTServ',
		function($scope, Config, CommonServ, RESTServ) {
			$scope.include = CommonServ.getTemplateUrl('modify');
			$scope.entity = {};
			angular.extend($scope.entity, Config.emptyEntity);
			$scope.saveEntity = function(){
				RESTServ.createAndReadEntity($scope.entity);
			};
		}]);


	angularMod.controller(config.name+'UpdateCtrl', [
		'$scope', '$routeParams', 'CommonServ', config.name+'RESTServ',
		function($scope, $routeParams, CommonServ, RESTServ) {
			$scope.include = CommonServ.getTemplateUrl('modify');
			$scope.entity = RESTServ.get({id: $routeParams.id}, function(entity){
				entity._id = $routeParams.id;
				$scope.saveEntity = function(){
					RESTServ.updateAndReadEntity(entity);
				};
			});
		}]);

	angularMod.controller(config.name+'ReadCtrl', [
		'$scope', '$routeParams', 'CommonServ', config.name+'RESTServ',
		function($scope, $routeParams, CommonServ, RESTServ) {
			$scope.include = CommonServ.getTemplateUrl('detail');

			$scope.entity = RESTServ.get({id: $routeParams.id}, function(){
			//	$scope.utils = CommonServ;		
			});	
		}]);
	
}






