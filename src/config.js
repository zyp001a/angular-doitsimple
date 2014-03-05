'use strict';

/* Config */

var eveConfig = angular.module('eveConfig', []);

eveConfig.factory('Config',
  function() {
		var config = {};
//		config.dirRoot = "sampleapp";
//		config.restRoot = "/books";
		config.defaultEntity = {
			name: '',
			authors: [''],
			description: ''
		};
		config.setDirRoot = function(dirRoot){
			config.dirRoot = dirRoot;
			config.templateUrls = {
				home: dirRoot + '/partials/home.html',
				list: dirRoot + '/partials/list.html',
				detail: dirRoot + '/partials/detail.html',
				modify: dirRoot + '/partials/modify.html'
			};
		};
		config.setRestRoot = function(restRoot){
			config.restRoot = restRoot;
		};
		return config;
	});
			
