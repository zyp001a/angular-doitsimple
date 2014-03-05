'use strict';

/* Services */

var eveCommonUtils = angular.module('eveCommonUtils', ['eveConfig', 'eveRestfulAPI']);

eveCommonUtils.factory('CommonUtils', 
	function(RestfulAPI, $location){
		return {
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
					$location.path("/detail/"+entity._id);
				});
			},
			updateEntity: function(entity){
				RestfulAPI.update({id:entity._id}, {$set: entity});
			},
			deleteEntity: function(entity){
				RestfulAPI.delete({id:entity._id}, function(){
					location.reload();
				});
			}
		};
	});
