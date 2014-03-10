var bookApp = angular.module('bookApp',
	[
		'eveCore', 
		'eveHeaderController', 
		'eveFileUpload'
	]);
bookApp.run(function(Config){
	Config.dirRoot = "seed";
	Config.restRoot = "/books";
	Config.defaultTplRoot = "src/tpl";
//	Config.templateUrls.list = "seed/partials/list.html";
//	Config.templateUrls.modify = "seed/partials/modify.html";
});

bookApp.directive('myCustomer', function() {
      return {
        restrict: 'E',
        scope: {
          customerInfo: '=info'
        },
        template: ' Name: {{customerInfo.name}} Address: {{customerInfo.address}}'
      };
    });
