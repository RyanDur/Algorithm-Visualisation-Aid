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
            variable: "=",
            ata: "=",
            ana: "="
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
                    search();
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

            scope.$watch('ata', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    if(scope.ata.clear) {
                        removeSearch();
                        searches.length = 0;
                    } else {
                        searches.length = 0;
                        scope.array = scope.ata.oldData;

                        $timeout(function() {
                            searches.push(scope.ata.leftIndex);
                            searches.push(scope.ata.rightIndex);
                            search();
                        }, 200);

                        $timeout(function() {
                            scope.array = scope.ata.newData;
                            dsc.removeClass('search', searches);
                        }, 750);
                    }
                }
            });

            scope.$watch('ana', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    scope.array = scope.ana.before;
                    $timeout(function() {
                        $('.index' + scope.ana.index).addClass('hide-text');
                    }, 500);
                    $timeout(function() {
                        $('.index' + scope.ana.index).removeClass('hide-text');
                        scope.array = scope.ana.after;
                    }, 1000);
                }
            });
            var search = function() {
                removeSearch();
                var children = elem.find('ul').children();
                for (var j = 0; j < children.length; j++) {
                    if (searches.indexOf(j) >= 0) {
                        angular.element(children[j]).addClass('search');
                    }
                }
            };
            var removeSearch = function() {
                var children = elem.find('ul').children();
                dsc.removeClass('search', children);
            };
        }
    };
};
