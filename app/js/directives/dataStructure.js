'use strict';

module.exports = function($timeout) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            data: "=",
            structure: "@",
	    search: "="
        },
        templateUrl: "templates/data_array.html",
        link: function(scope, elem, attrs) {
            var old = [];
            scope.data = [];
            scope.array = undefined;
	    scope.$watch('search', function() {
		console.log('hello');
	    });
            scope.$watch('data', function(newVal, oldVal) {
                scope.push = false;
                if(!newVal.equals(oldVal)) {
		    if(old.length === 0) {
			scope.push = true;
		    }else {
			$timeout(function() {
                            scope.push = true;
			}, 100);
		    }
                    scope.array = scope.data;
                    old = scope.data;
                }
            });
        }
    };
};
