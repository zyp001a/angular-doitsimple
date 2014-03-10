'use strict';

/* Services */

var eveCommonUtils = angular.module('eveCommonUtils', ['eveConfig', 'eveRestfulAPI']);

eveCommonUtils.factory('CommonUtils', 
	function(RestfulAPI, $location){
		return {
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
			},
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

		};
	});
