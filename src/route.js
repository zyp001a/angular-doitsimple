'use strict';

/* Route */
var eveRoute = angular.module('eveRoute', ['ngRoute', 'eveMainController']);

eveRoute.config(
  function($routeProvider) {
    $routeProvider.
      when('/', {
				template: '<div ng-include="include"></div>',
        controller: 'HomeCtrl'
      }).
      when('/list', {
        template: '<div ng-include="include"></div>',
        controller: 'ListCtrl'
      }).
      when('/detail/:id', {
        template: '<div ng-include="include"></div>',
        controller: 'DetailCtrl'
      }).
			when('/add', {
				template: '<div ng-include="include"></div>',
        controller: 'AddCtrl'
			}).
			when('/edit/:id', {
				template: '<div ng-include="include"></div>',
				controller: 'EditCtrl'
			}).
			when('/upload/batch', {
				template: '<div ng-include="include"></div>',
				controller: 'FileUploadCtrl'
			}).
      otherwise({
        redirectTo: '/list'
      });
  });

