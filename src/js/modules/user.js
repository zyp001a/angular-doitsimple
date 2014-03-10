'use strict';

/* Controllers */

var eveUser = angular.module('eveUser', ['eveConfig']);
var User = eveFileUpload.controller('User', function($scope){
//	console.log("eve user module loaded");	
});
User.directive('dd', function(Config) {
  return {
		restrict: 'A',
		link: function(scope, elem, attrs){
			
			elem.fileupload({
				url: '/upload',
				dataType: 'json',
				done: function (e, data) {
          $.each(data.result.files, function (index, file) {						
						$(elem).find("span").append("<p>"+file.name+"</p>");
          });
				}
			});
			console.log("upload directive works");

		},
		template: '<input type="file" name="files[]" multiple><span></span>'
  };
});






