'use strict';

/* Services */

var eveRestfulAPI = angular.module('eveRestfulAPI', ['ngResource', 'eveConfig']);

eveRestfulAPI.factory('RestfulAPI', 
  function($resource, Config){
//		console.log(Config);
    return $resource(Config.restRoot + '/:id', null, 
			{
				'update': { method:'PUT'}
			});
  });


