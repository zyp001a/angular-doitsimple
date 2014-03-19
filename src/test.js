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
	

