'use strict';

/* App Module */
var eveCore = angular.module('eveCore', [
	'eveConfig',
	'eveRoute',
  'eveMainController',
  'eveCommonUtils',
	'eveRestfulAPI',

	'eveJsonDisplay'
]);
var eveFull = angular.module('eveFull', [
	'eveCore',
	'eveHeaderController',
	'eveFileUpload',
	'eveEditable'
]);



