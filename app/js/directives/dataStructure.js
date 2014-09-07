'use strict';
var DataStructureCtrl = require('./controllers/DataStructureCtrl');

module.exports = function ($timeout) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            data: "=",
            structure: "@",
            search: "=",
            method: "@"
        },
        templateUrl: "templates/data_array.html",
        link: function (scope, elem) {
            var dsc = new DataStructureCtrl(scope, $timeout);
            scope.searches = [];
            scope.data = [];
            scope.array = scope.data;

            scope.$watch('search', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    console.log(scope.search);
                    if(scope.search !== undefined) {
                        scope.searches.push(scope.search);
                    } else {
                        scope.searches.length = 0;
                        dsc.removeClass('search', scope.searches);
                    }
                    var children = elem.find('ul').children();
                    dsc.removeClass('search', children);
                    for (var j = 0; j < children.length; j++) {
                        if (scope.searches.indexOf(j) >= 0) {
                            angular.element(children[j]).addClass('search');
                        }
                    }
                }
            });

            scope.$watch('data', function (newVal, oldVal) {
                if (!newVal.equals(oldVal)) {
                    if (scope.method) {
                        dsc.methods[scope.method]();
                    } else {
                        dsc.setArray();
                    }
                }
            });
        }
    };
};
