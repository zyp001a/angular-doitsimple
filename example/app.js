var bookApp = angular.module('bookApp',
	[
		'eveCore', 
		'eveHeaderController'
	]);

bookApp.run(function(Config){
//	Config.dirRoot = "";
//	Config.templateUrls.list = "seed/partials/list.html";
//	Config.templateUrls.modify = "seed/partials/modify.html";

	Config.getDefaultTplRoot = function(){ 
		return "vendor/angular-doitsimple/html";
	};
	Config.getRestRoot = function(){
		return "/api/books";
	};
	Config.getDefaultEntity = function(){
		return {
      name: '',
      authors: [''],
      description: ''
    };
	};

});


var userApp = angular.module('userApp',
	[
		'eveCore', 
		'eveHeaderController'

	]);
userApp.run(function(Config){
//	Config.dirRoot = "";
//	Config.templateUrls.list = "seed/partials/list.html";
//	Config.templateUrls.modify = "seed/partials/modify.html";
	Config.getDefaultTplRoot = function(){ 
		return "vendor/angular-doitsimple/html";
	};
	Config.getRestRoot = function(){
		return "/api/user";
	};
	Config.getDefaultEntity = function(){
		return {
      userid: '',
      access_token: ''
    };};

});

