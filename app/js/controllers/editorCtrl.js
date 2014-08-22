'use strict';

module.exports = function(editor, parser) {

    return function($scope, $timeout) {

	var forEach = function(collection, func) {
            for(var i = 0; i < collection.length; i++) {
		func(collection[i], i);
            }
	};

	var executeAsynchronously = function(functions, timeout) {
            forEach(functions, function(func, index) {
		$timeout(function() {
		    func($scope, editor);
		}, index*timeout);
            });
	};

	$scope.getInput = function() {
            var result = parser.parse(editor.getContent());
            var ani = result.animation;
	    ani.push(function($scope, editor) {
		editor.removeHighlight();
	    });
            $scope.output = result.print;
            executeAsynchronously(ani, 750);
	};
    };
};
