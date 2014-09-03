'use strict';

module.exports = function($timeout) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            data: "=",
            structure: "@",
            searches: "="
        },
        templateUrl: "templates/data_array.html",
        link: function(scope, elem, attrs) {
            var old = [];
            scope.data = [];
            scope.searches = [];
            scope.array = undefined;
            scope.$watch('searches', function(newVal, oldVal) {
                if(!newVal.equals(oldVal)) {
                    var children = elem.find('ul').children();
		    for(var i = 0; i < children.length; i++) {
			angular.element(children[i]).removeClass('search');
		    }
                    for(var i = 0; i < children.length; i++) {
                        if(scope.searches.indexOf(i) >= 0) {
			    angular.element(children[i]).addClass('search');
                        }
                    }
                }
            });
            scope.$watch('data', function(newVal, oldVal) {
                if(!newVal.equals(oldVal)) {
                    scope.push = false;
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
