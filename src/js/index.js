
var defaultConfig = {
	name: 'main',
	type: 'main',
	modules: [
	]
};
var exampleConfig = {
	resourceRoot: '',
	modules: [
		{
			type: 'restView',
			name: 'book',
			apiRoot: '/api/books',
			webRoot: '/book',
			tokenField: 'access_token',
			emptyEntity: {
				name: '',
				authors: [''],
				description: ''
			}
		},
		{
			type: 'listView',
			src: 'book',
			name: 'bookList'
		},
		{
			type: 'jsonView',
			name: 'jsonView'
		}
	]
};
var config;
var angularMod;
window.doit = doit = {
	init: init,
	getConfig: getConfig,
	extendConfig: extendConfig,
	validateConstantFields: validateConstantFields,
	validateArrayFields: validateArrayFields,
	module:{}
};
/**
 * common utils
 */
function getConfig(){
	return config;
}
function extendConfig(configToExtend, configToSet){
  var config = configToExtend;
  for (var key in configToSet){
    config[key] = configToSet[key];
  }
	return config;
};
function validateConstantFields(configToVal, fields){
	fields.forEach(function(field){
		if(!angular.isDefined(configToVal[field]))
			console.error(Error(configToVal.name + ' config: ' + field + ' must be defined'));

	});

}
function validateArrayFields(configToVal, fields){
	fields.forEach(function(field){
		var arr = configToVal[field];
		if(!angular.isArray(arr) && arr.length !== 0)
			console.error(Error(configToVal.name + ' config: ' + field + ' must be array'));
	});
}
/**
 * init functions
 */

function validateEnv(){
};
function validateConfig(configToVal){
	validateConstantFields(configToVal, ['resourceRoot']);
	validateArrayFields(configToVal, ['modules']);
}

function init(configToSet){
	validateEnv();
	if(configToSet)
		config = extendConfig(defaultConfig, configToSet);
	else
		config = extendConfig(defaultConfig, exampleConfig);
	validateConfig(config);
	
	angularMod = angular.module('main',['ngRoute']);
	angularMod.constant('Config', config);
	initServ();
	initCtrl();
		
	config.modules.forEach(function(modConfig){
		config.modules[modConfig.name] = modConfig;
		loadModule(modConfig);
	});
	initApp();
}

function initServ(){
	angularMod.factory('CommonServ',	function($route, $location, Config){
		return {
			getTemplateUrl: function(key){
				if(Config.templateUrls && Config.templateUrls[key])
					return Config.templateUrls[key];
				else
					return Config.resourceRoot + '/html/' + key + '.html';
			},

			addRoute: function(path, ctrl) {
				when(path, {
					template: '<div ng-include="include"></div>',
					controller: ctrl
				});
				console.log($route);
				
				function when(path, route) {
					$route.routes[path] = angular.extend({
						reloadOnSearch: true
					}, route, path && pathRegExp(path, route));

					// create redirection for trailing slashes
					if (path) {
						var redirectPath = (path[path.length - 1] == '/') ? path.substr(0, path.length - 1) : path + '/';

						$route.routes[redirectPath] = angular.extend({
							redirectTo: path
						}, pathRegExp(redirectPath, route));
					}
					//			console.log($route)

					function pathRegExp(path, opts) {
						var insensitive = opts.caseInsensitiveMatch,
								ret = {
									originalPath: path,
									regexp: path
								},
								keys = ret.keys = [];

						path = path.replace(/([().])/g, '\\$1')
							.replace(/(\/)?:(\w+)([\?\*])?/g, function (_, slash, key, option) {
								var optional = option === '?' ? option : null;
								var star = option === '*' ? option : null;
								keys.push({
									name: key,
									optional: !! optional
								});
								slash = slash || '';
								return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (star && '(.+?)' || '([^/]+)') + (optional || '') + ')' + (optional || '');
							})
							.replace(/([\/$\*])/g, '\\$1');

						ret.regexp = new RegExp('^' + path + '$', insensitive ? 'i' : '');
						return ret;
					}
				}
			},

			toPropArray: function(obj){
				var array=[];
				for (var key in obj){
					var type=typeof(obj[key]);
					if(angular.isArray(obj[key])){
						type = "array";
					}
					array.push({
						key:key,
						type:type
					});
				}
				return array;
			},
			isOrderable: function(obj){
				return obj.type == 'number' || obj.type == 'string';
			},
			isActive: function(appLocation){
				return appLocation===$location.path();
			}


		};
	});		
}
function initCtrl(){
	angularMod.config(function($routeProvider){
		$routeProvider.
			when("/",{
				template: '<div ng-include="include"></div>',
				controller: 'HomeCtrl'
			}).
			when("/about",{
				template: '<div ng-include="include"></div>',
        controller: 'AboutCtrl'
			}).
			otherwise({
				template: '<div ng-include="include"></div>',
        controller: 'DefaultCtrl'
			});
	});
	angularMod.controller('HomeCtrl',	function($scope, CommonServ) {
		$scope.include = CommonServ.getTemplateUrl('home');
  });

	angularMod.controller('AboutCtrl', function($scope, CommonServ) {
		$scope.include = CommonServ.getTemplateUrl('about');
  });

	angularMod.controller('DefaultCtrl', function($scope, CommonServ) {
		$scope.include = CommonServ.getTemplateUrl('default');
  });

	angularMod.controller('HeaderCtrl', function($scope, CommonServ){
    $scope.isActive = CommonServ.isActive;
  });
	
}

function validateModConfig(configToVal){
	doit.validateConstantFields(configToVal, ['type', 'name']);
	if(!angular.isDefined(doit.module[configToVal.type]))
		console.error(Error('module type ' + configToVal.type +' doesn\'t exist'));
}

function loadModule(modConfig){
	validateModConfig(modConfig);
	var modType = modConfig.type;
	doit.module[modType].init(modConfig);
}

function initApp(){
	var deps = ['main'];
	config.modules.forEach(function(modConfig){
		deps.push(modConfig.name);
	});
	console.log(deps);
	angular.module('doitApp',deps);
}



