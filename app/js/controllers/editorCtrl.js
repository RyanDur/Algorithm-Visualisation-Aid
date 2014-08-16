'use strict';

module.exports = function(editor, parser, config) {
    return function($scope) {
	$scope.output = "";
	var c;
	$scope.$watch('output', function() {
	    c = config.get();
	    $scope.data = c.data;
	    $scope.structure = c.structure;
	});
	$scope.getInput = function() {
            $scope.output = parser.parse(editor.getContent());
	};
    };
};
