'use strict';

module.exports = function(editor, parser) {

    return function($scope, $timeout) {

	var forEach = function(collection, func) {
            for(var i = 1; i <= collection.length; i++) {
		func(collection[i-1], i);
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
            $scope.output = result.print;
            editor.highlightLine();
            executeAsynchronously(ani, 750);
	};
    };
};
