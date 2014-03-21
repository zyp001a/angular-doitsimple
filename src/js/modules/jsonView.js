
var defaultConfig = {
	type: 'jsonView'
};
var config;
var angularMod;
doit.module[defaultConfig.type] = {
	init: init
};

function validateConfig(configToVal){
}

function init(configToSet){
	console.log(configToSet);
	config = doit.extendConfig(defaultConfig, configToSet);
	validateConfig(config);

	angularMod = angular.module(config.name, [], function($compileProvider){
		$compileProvider.directive('json', function($compile, $parse) {
			return function(scope, element, attrs) {
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

  angularMod.constant(config.name+'Config', config);
}



