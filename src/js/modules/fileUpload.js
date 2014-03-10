'use strict';

/* Controllers */

var eveFileUpload = angular.module('eveFileUpload', ['eveConfig']);
var FileUpload = eveFileUpload.controller('FileUpload', function($scope){
	console.log("aaa");	
})
FileUpload.directive('fileUploadDirect', function(Config) {
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






