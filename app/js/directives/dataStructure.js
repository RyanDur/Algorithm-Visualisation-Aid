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
            method: "@",
            variable: "="
        },
        templateUrl: "templates/data_array.html",
        link: function (scope, elem) {
            var dsc = new DataStructureCtrl(scope, $timeout);
            var searches = [];
            scope.data = [];
            scope.array = scope.data;

            scope.$watch('search', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    if(scope.search !== undefined) {
                        searches.push(scope.search);
                    } else {
                        dsc.removeClass('search', searches);
                        searches.length = 0;
                    }
                    var children = elem.find('ul').children();
                    dsc.removeClass('search', children);
                    for (var j = 0; j < children.length; j++) {
                        if (searches.indexOf(j) >= 0) {
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
