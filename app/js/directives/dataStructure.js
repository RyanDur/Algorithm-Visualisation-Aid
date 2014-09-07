'use strict';

module.exports = function($timeout) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            data: "=",
            structure: "@",
            searches: "=",
            method: "@"
        },
        templateUrl: "templates/data_array.html",
        link: function(scope, elem) {
            var old = [];
            scope.data = [];
            scope.searches = [];
            scope.array = scope.data;
            scope.$watch('searches', function(newVal, oldVal) {
                if(!newVal.equals(oldVal)) {
                    var children = elem.find('ul').children();
                    for(var i = 0; i < children.length; i++) {
                        angular.element(children[i]).removeClass('search');
                    }
                    for(var j = 0; j < children.length; j++) {
                        if(scope.searches.indexOf(j) >= 0) {
                            angular.element(children[j]).addClass('search');
                        }
                    }
                }
            });
            scope.$watch('data', function(newVal, oldVal) {
                if(!newVal.equals(oldVal)) {
                    if(scope.method) {
                        methods[scope.method]();
                    } else {
                        scope.array = scope.data;
                        old = scope.data;
                    }
                }
            });

            var methods = {
                push: function() {
                    scope.array = scope.data;
                    old = scope.data;
                    scope.push = false;
                    $timeout(function() {
                        scope.push = true;
                    }, 100);
                },
                pop: function() {
		    scope.pop = false;
                    var f = [function() {scope.pop = true;},
                             function() {
                                 scope.array = scope.data;
                                 old = scope.data;
                             }];
                    executeAsynchronously(f, 1500);
                }
            };

            var forEach = function(collection, func) {
                for(var i = 0; i < collection.length; i++) {
                    func(collection[i], i);
                }
            };

            var executeAsynchronously = function(functions, timeout) {
                forEach(functions, function(func, index) {
                    $timeout(function() {
                        func();
                    }, index*timeout);
                });
            };
        }
    };
};
