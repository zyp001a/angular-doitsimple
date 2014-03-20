'use strict';

/* Services */

var eServREST = angular.module('eServREST', ['ngResource', 'eServCommon']);

eServREST.factory('ServREST',
  function($resource, Config, ServCommon){
		var token_json={};
		var restToken = Config.restToken;
		var restRoot = Config.restRoot;
		if(restToken){
			token_json[restToken] = "token1";
		}
		if(restRoot){
			var api = $resource(restRoot + '/:id', token_json, {
				'update': { method:'PUT'}
			});
			api.createAndReadEntity = function(entity){
				api.save(entity, function(entity){
					ServCommon.navigate("/read/"+entity._id);
				});
			};
			api.updateAndReadEntity = function(entity){
				var id = entity._id;
				console.log(entity);
				api.update({id:id}, entity, function(entity){
					console.log(entity);
					ServCommon.navigate("/read/"+entity._id);
				});
			};
			api.deleteEntityAndSearch = function(entity){
        api.delete({id:entity._id}, function(entity){
          ServCommon.navigate("/search");
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
  });


