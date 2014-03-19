'use strict';

var eveDeps = angular.module('eveDeps', [
	'ngRoute'
]).config(function($routeProvider) {
	$routeProvider.
    when('/', {
      template: '<div ng-include="include"></div>',
      controller: 'HomeCtrl'
    }).
    when('/about', {
      template: '<div ng-include="include"></div>',
      controller: 'AboutCtrl'
    }).
		otherwise({
			template: 'default template'
		});
});

/* App Module */
var eveCore = angular.module('eveCore', [
	'eveDeps',

  'eServCommon',
	'eServREST',

  'eCtrlMain',
	'eCtrlCRUD',
  'eCtrlSearch',

	'eDirJsonView'
]);
/*
var eveFull = angular.module('eveFull', [
	'eveCore',
	'eveHeaderController',
	'eveFileUpload',
	'eveEditable'
]);
*/


