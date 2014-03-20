'use strict';

/* Controllers */

var eDirJsonView = angular.module('eDirJsonView', [], 
	function($compileProvider){
		$compileProvider.directive('json', function($compile, $parse) {
			return function(scope, element, attrs) {
/*
				var getHtmlList = function(value){
					var html='';
					value.forEach(function(el){
						html+=(getHtmlListSub(el));
					});
					return html;
				};
*/
/*
				var getHtmlList = function(value, model){
					var json = value.defaultEntity;
					var html = '<div class="col-md-9">';
					html += '<div ng-repeat="entity in entities track by $index | filter:query | orderBy:orderProp" ><h2><a href="#/detail/{{entity._id}}">{{entity.name}}</a></h2><a href="#/edit/{{entity._id}}" class="btn btn-xs btn-primary">Edit</a><a ng-click="utils.deleteFromEntities(entities, $index)" class="btn btn-xs btn-danger">Delete</a>';
					for (var key in json){
						if(key[0]==="$" || key[0]==="_") continue;
						if(key === 'name'){
							continue;
						}
						else{
							html+=('<ul class="list-inline"><li><strong>'+key+': </strong></li>');
							html+=('<li json="entity.' + key + '" method="view"><li>');
							html+='</ul>';
						}
					}
					html += '</div></div>';
					return html;
				};
				var getHtmlDetail = function(json){
//					console.log("detail");
					var html = '';
          html += '<div class="col-md-9"><h2><a href="#/detail/' + json._id + '">' + json.name + '</a></h\
2>';
          html+='<a href="#/edit/' + json._id + '" class="btn btn-xs btn-primary">Edit</a>';
          html+='<a ng-click="utils.deleteEntityAndRedirect(entity)" class="btn btn-xs btn-danger">Delete</a>';
          for (var key in json){
            var value= json[key];
            if(key[0]==="$" || key[0]==="_") continue;
            if(key === 'name'){
              continue;
            }
            else{
              html+=('<ul class="list-inline"><li><strong>'+key+': </strong><li>');
              html+=getHtml(value);
              html+='</ul>';
            }
					}
					return html;
				};

				var getHtmlModify = function(json, model){
					var html = '<div>';
					for (var key in json){
						var value= json[key];
						if(key[0]==="$" || key[0]==="_") continue;
						html+=('<label class="control-label">'+key+'</label>');
						html+=('<ul class="list-inline">');
						html+=getHtmlInput(value, model+'.'+key);
						html+='</ul>';
					}
					html+='<p><a class="btn btn-primary" ng-click="saveEntity()">Save</a><button class="btn btn-default">Cancel</button></p>';

					html += '</div>';
					return html;

				};
*/

				var getHtml = function(value){
					var html='';
					switch (typeof value) {
					case 'object':
						if(angular.isArray(value)){
							html+='<ul class="list-inline">';
							value.forEach(function(el){
								html+=('<li>'+getHtml(el)+'</li>');
							});
							html+="</ul>";
						}
						else{
							html+=getHtmlSub(value);
						}
						break;
					default:
						html+=value.toString();
					}
					return html;
				};
				var getHtmlSub = function(json){
					var html = '<div>';
					for (var key in json){
						var value= json[key];
						if(key[0]==="$" || key[0]==="_") continue;
            if(key === 'name'){
							html += '<h2><a ng-href="{{getUrl(\'/read/\'+entity._id)}}">{{entity.name}}</a></h2>';
            }
						else{
							html+=('<ul class="list-inline"><li><strong>'+key+': </strong><li>');
							html+=getHtml(value);
							html+='</ul>';
						}
					}
					html += '</div>';
					return html;
				};

				var getLiteral = function(str){
					return str.replace(".","_").replace(/\[\S+\]/g, "");
				};
				
				var getHtmlInput = function(value, model){
					var html='';

					switch (typeof value) {
					case 'object':
						if(angular.isArray(value)){
							var modelI = "i"+getLiteral(model);
//							console.log(model);
//							console.log(modelI);
							html+='<ul class="list-inline">';
							html+=('<li ng-repeat="it in ' + model + ' track by $index" ng-init="' + modelI + '=$index">');
							html+='<div class="input-group" json="' + model+ '[' + modelI + ']" type="edit">';
							html+='<span class="input-group-btn"><a button class="btn btn-default" ng-click="' + model + '.splice(' + modelI + ',1)"><span class="glyphicon glyphicon-remove"></span></a></span>';
							html+='</div></li>';
							html+='<button class="btn btn-xs btn-primary" ng-click="'+model+'.push(\'\')"><span class="glyphicon glyphicon-plus"></span></button>';
							html+="</ul>";
						}
						else{
							html+=getHtmlInputSub(value, model);
						}
						break;
					default:
						html+=('<input type="text" class="form-control" ng-model="' + model +'">');

					}
					return html;
				};
				var getHtmlInputSub = function(json, model){
					var html = '<div>';
					for (var key in json){
						var value= json[key];
						if(key[0]==="$" || key[0]==="_") continue;
						html+=('<label class="control-label">'+key+'</label>');
						html+=('<ul class="list-inline">');
						html+=getHtmlInput(value, model+'.'+key);
						html+='</ul>';
					}
					html += '</div>';
					return html;
				};


        scope.$watch(attrs.json, function(value) {

					// when the 'compile' expression changes
					// assign it into the current DOM
					if(angular.isDefined(attrs.resolved)) return;
					
					function applyElementRaw(parseFunction){
						element.html(parseFunction(value, attrs.json) + element.html());
						$compile(element.contents())(scope);
						attrs.resolved = '';
					};
					function applyElement(parseFunction){
						if(value.$promise){
							value.$promise.then(function(){
								applyElementRaw(parseFunction);
							});
						}
						else{
							applyElementRaw(parseFunction);
						}
					};
					function applyElementWithPromise(parseFunction){
						value.$promise.then(function(){
              applyElementRaw(parseFunction);
            });
					}
					
					applyElement = angular.isDefined(attrs.promise)?
						applyElementWithPromise:applyElement;
					switch(attrs.type){
					case 'view':
						applyElement(getHtml);
						break;
					case 'edit':
						applyElement(getHtmlInput);
						break;
					case 'editable':
						applyElement(getHtmlEditable);
						break;
					default:
						applyElement(getHtml);
					}

				});
      };
		});
	});








