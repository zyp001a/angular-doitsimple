'use strict';

/* Services */

var eServREST = angular.module('eServREST', ['ngResource']);

eServREST.factory('RESTServ', 
  function($resource, Config){
		var token_json={};
		var restToken = Config.restToken;
		var restRoot = Config.restRoot;
		if(restToken){
			token_json[restToken] = "token1";
		}
		if(restRoot){
//		console.log(Config);
			return $resource(restRoot + '/:id', token_json, {
				'update': { method:'PUT'}
			});
		}
		else{
			console.log("no REST root");
			return null;
		}
  });


