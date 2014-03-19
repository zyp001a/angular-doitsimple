'use strict';
/* Services */

var eServCommon = angular.module('eServCommon', ['ngRoute']);

eServCommon.factory('CommonServ',	function($route, $location, Config){
	return {
		addRoute: function(path, route) {
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
		},

		getTemplateUrl: function(key){
			if(Config.templateUrls && Config.templateUrls[key])
				return Config.templateUrls[key];
			else
				return Config.htmlRoot + '/' + key + '.html';
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
		/*
		 addEntityAndRedirect: function(entity){
		 RestfulAPI.save(entity, function(entity){
		 $location.path("/detail/"+entity._id);
		 });
		 },
		 updateEntityAndRedirect: function(entity){
		 RestfulAPI.update({id:entity._id}, {$set: entity}, function(entity){
		 console.log(entity);
		 $location.path("/detail/"+entity._id);
		 });
		 },
		 deleteEntityAndRedirect: function(entity){
		 RestfulAPI.delete({id:entity._id}, function(){
		 $location.path("/list");
		 });
		 },
		 updateEntity: function(entity){
		 RestfulAPI.update({id:entity._id}, {$set: entity});
		 },
		 deleteEntity: function(entity){
		 RestfulAPI.delete({id:entity._id});
		 },
		 deleteFromEntities: function(entities, index){
		 RestfulAPI.delete({id:entities[index]._id}, function(){
		 entities.splice(index, 1);
		 });
		 }
		 */
	};
});
