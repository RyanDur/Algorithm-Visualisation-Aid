'use strict';

module.exports = function(editor, parser) {
    return function($scope) {
	$('button').click(function() {
	    parser.parse(editor.getContent());
	});

	$scope.getInput = function() {
            parser.parse(editor.getValue());
	};
    };
};
