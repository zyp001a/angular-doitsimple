var bookApp = angular.module('bookApp',
	[
		'eveCore', 
		'eveHeaderController', 
		'eveFileUpload'
	]);
bookApp.run(function(Config){
//	Config.dirRoot = "";
//	Config.templateUrls.list = "seed/partials/list.html";
//	Config.templateUrls.modify = "seed/partials/modify.html";
	Config.getDefaultTplRoot = function(){ 
		return "html";
	};
	Config.getRestRoot = function(){
		return "/books";
	};
	Config.getDefaultEntity = function(){
		return {
      name: '',
      authors: [''],
      description: ''
    };};

});


