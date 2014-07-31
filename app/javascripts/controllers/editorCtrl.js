'use strict';

module.exports = function(editor) {
    return function($scope) {
	var edit = editor(editor);
	$scope.getInput = function() {
	    return edit.getValue();
	};
    };
};
