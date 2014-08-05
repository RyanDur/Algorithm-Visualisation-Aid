'use strict';

module.exports = function(editor) {
    return function($scope) {
	var e = editor('editor');
	$scope.getInput = function() {
	    return e.getValue();
	};
    };
};
