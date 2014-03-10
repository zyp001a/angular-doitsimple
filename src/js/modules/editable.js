'use strict';

/* App Module */
var eveEditable = angular.module('eveEditable', ['xeditable']);

eveEditable.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});


