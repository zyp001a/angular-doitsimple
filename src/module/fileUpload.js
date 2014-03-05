'use strict';

/* Controllers */

var eveFileUpload = angular.module('eveFileUpload', ['blueimp.fileupload']);

eveFileUpload.config(['$httpProvider', 'fileUploadProvider',
	function ($httpProvider, fileUploadProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    fileUploadProvider.defaults.redirect = window.location.href.replace(
        /\/[^\/]*$/,
      '/cors/result.html?%s'
    );
      // Demo settings:
    angular.extend(fileUploadProvider.defaults, {
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
      disableImageResize: /Android(?!.*Chrome)|Opera/
				.test(window.navigator.userAgent),
      maxFileSize: 5000000,
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
    });

  }]);

eveFileUpload.controller('FileUploadCtrl', 
  function($scope, $http, $routeParams){
		var url = '/upload';
		$scope.options = {
      url: url
    };
		$scope.loadingFiles = true;
/*
    $http.get(url)
      .then(
        function (response) {
          $scope.loadingFiles = false;
          $scope.queue = response.data.files || [];
        },
        function () {
          $scope.loadingFiles = false;
        }
      );
*/
	});
eveFileUpload.controller('FileDestroyCtrl',													 
	function ($scope, $http) {
    var file = $scope.file,
        state;
    if (file.url) {
      file.$state = function () {
        return state;
      };
      file.$destroy = function () {
        state = 'pending';
        return $http({
          url: file.deleteUrl,
          method: file.deleteType
        }).then(
          function () {
            state = 'resolved';
            $scope.clear(file);
          },
          function () {
            state = 'rejected';
          }
        );
      };
    } else if (!file.$cancel && !file._index) {
      file.$cancel = function () {
        $scope.clear(file);
      };
    }
  });




