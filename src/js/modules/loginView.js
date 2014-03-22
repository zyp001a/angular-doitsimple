var defaultConfig = {
	type: 'loginView'
};

doit.module[defaultConfig.type] = {
	init: init
};

function validateConfig(configToVal){
	doit.validateConstantFields(configToVal, [

	]);
}

function init(configToSet){
//	console.log(configToSet);
	var config = doit.extendConfig(defaultConfig, configToSet);
	config.srcConfig = doit.getConfig().modules[config.src];
	validateConfig(config);
	configToSet = config;

	
	var angularMod = angular.module(config.name,['ngRoute']);
  angularMod.constant(config.name+'Config', config);
	initServ(config, angularMod);
	initCtrl(config, angularMod);
}

function initServ(config, angularMod){
}
function initCtrl(config, angularMod){
	angularMod.run([
		config.name+'Config', 'CommonServ', 
		function(Config, CommonServ){
			CommonServ.addRoute('/login', config.name+'LoginCtrl');
		}]);

	angularMod.controller(config.name+'LoginCtrl', [
		'$scope', '$http', '$window', 'CommonServ',
		function ($scope, $http, $window, CommonServ) {
		$scope.include = CommonServ.getTemplateUrl('login');
		$scope.user = {userid: 'user1', password: '123456'};
		$scope.message = '';
		$scope.submit = function () {
			console.log($scope.user);
			$http
				.post('/api/authenticate', $scope.user)
				.success(function (data, status, headers, config) {
					$window.sessionStorage.token = data.token;
					$scope.message = 'Welcome';
				})
				.error(function (data, status, headers, config) {
					// Erase the token if the user fails to log in
					delete $window.sessionStorage.token;

					// Handle login errors here
					$scope.message = 'Error: Invalid user or password';
				});
		};
	}]);
}

