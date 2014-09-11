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
                    if (scope.search !== undefined) {
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

            scope.$watch('ata', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    var value;
                    var left;
                    var right;
                    scope.ata.oldData.push(scope.ata.value);
                    scope.array = scope.ata.oldData;
                    $timeout(function() {
                        value = getValue(elem, '.hidden');
                        left = getIndex(elem, scope.ata.leftIndex);
                        right = getIndex(elem, scope.ata.rightIndex);
                        value = copy(value, right);
                    }, 10);
                    $timeout(function() {
                        value.removeClass('hidden');
                    }, 20);
                    $timeout(function() {
                        copy(value, left);
                    },200);
                    $timeout(function() {
                        scope.ata.newData.push(scope.ata.value);
                        scope.array = scope.ata.newData;
                    }, 400);
                    $timeout(function() {
                        value.addClass('hidden');
                    }, 450);
                }
            });

            scope.$watch('ana', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    scope.array = scope.ana.before;
                    $timeout(function () {
                        $('.index' + scope.ana.index).addClass('hide-text');
                    }, 500);
                    $timeout(function () {
                        $('.index' + scope.ana.index).removeClass('hide-text');
                        scope.array = scope.ana.after;
                    }, 1200);
                }
            });
            var search = function () {
                removeSearch();
                var children = elem.find('ul').children();
                for (var j = 0; j < children.length; j++) {
                    if (searches.indexOf(j) >= 0) {
                        angular.element(children[j]).addClass('search');
                    }
                }
            };
            var removeSearch = function () {
                var children = elem.find('ul').children();
                dsc.removeClass('search', children);
            };

            var copy = function(value, index) {
                value.offset(getOffset(index));
                return value;
            };

            var getIndex = function(element, num) {
                return element.find('.index' + num);
            };

            var getValue = function(element, name) {
                return element.find(name);
            };

            var getOffset = function(obj) {
                return obj.offset();
            };
        }
    };
};
