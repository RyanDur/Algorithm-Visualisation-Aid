'use strict';

module.exports = function(editor, parser) {
    return function($scope) {
	$scope.getInput = function() {
            parser.parse(editor.getContent());
	};
    };
};
