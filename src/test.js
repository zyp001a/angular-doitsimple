var bookConfig = {
	htmlRoot: "html",
	restRoot: "/api/books",
	webRoot: "/book",
	restToken: "access_token",
	getDefaultEntity: function(){ 
		return {
			name: '',
			authors: [''],
			description: ''
		}; 
	}
};
var bookApp = angular.module('bookApp',[
	'eveCore'
//	'eveHeaderController'
]).constant('Config',bookConfig);
/*
var userConfig = {
	htmlRoot: "html",
	restRoot: "/api/users",
	webRoot: "/user",
	restToken: "access_token",
	getDefaultEntity: function(){ 
		return {
			name: '',
			authors: [''],
			description: ''
		}; 
	}
};
var userApp = angular.module('userApp',[
	'eveCore'
//	'eveHeaderController'
]).constant('Config',userConfig);
	

var mainApp = angular.module('mainApp',[
  'bookApp',
	'userApp'
//  'eveHeaderController'
]);
*/
