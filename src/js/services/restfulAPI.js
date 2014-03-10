'use strict';

/* Services */

var eveRestfulAPI = angular.module('eveRestfulAPI', ['ngResource', 'eveConfig']);

eveRestfulAPI.factory('RestfulAPI', 
  function($resource, Config){
		var token_json={};
		var restToken = Config.getRestToken();
		if(restToken){
			token_json[restToken] = Config.getToken();
		}
//		console.log(Config);
    return $resource(Config.getRestRoot() + '/:id', 
			token_json,
			{
				'update': { method:'PUT'}
			});
  });


