'use strict';

/* Config */

var eveConfig = angular.module('eveConfig', []);

eveConfig.factory('Config',
  function() {
		var defaultConfig = {};

		defaultConfig.getRestToken = function(){ return "access_token"; };
		
		defaultConfig.getRestRoot = function(){};

		defaultConfig.getDefaultTplRoot = function(){};

		defaultConfig.getDefaultEntity = function(){};

/*
		defaultConfig.defaultEntity = {
			name: '',
			authors: [''],
			description: ''
		};
*/
		defaultConfig.validate = function(){
/*
			if(!defaultConfig.dirRoot){
				console.log('Error, please set \'dirRoot\'!');
			}
*/
			if (!restRoot){
				console.log('Error, please set \'restRoot\'!');
			}
			if (!defaultTplRoot){
				console.log('Error, please set \'defaultTplRoot\'!');
			}
			if (!defaultEntity){
				console.log('Error, please set \'defaultEntity\'!');
			}

		};
		defaultConfig.templateUrls = {};
		
		defaultConfig.getTemplateUrls = function(key){
			return defaultConfig.getDefaultTplRoot() + '/' + key + '.html';
		};
/*
		defaultConfig.setDirRoot = function(dirRoot){
			defaultConfig.dirRoot = dirRoot;
		};
		defaultConfig.setRestRoot = function(restRoot){
			defaultConfig.restRoot = restRoot;
		};
*/
		defaultConfig.getToken = function(){
			return "token1";
		};
		return defaultConfig;
	});
			
