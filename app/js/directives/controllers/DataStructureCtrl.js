'use strict';

var DataStructureCtrl = function(scope, $timeout) {
    this.methods = {
        push: function () {
            setArray();
            scope.push = false;
            $timeout(function () {
                scope.push = true;
            }, 100);
        },
        pop: function () {
            scope.pop = false;
            var f = [function () {
                scope.pop = true;
            }, function () {
                setArray();
            }];
            executeAsynchronously(f, 1500);
        }
    };
    this.removeClass = function (clazz, children) {
        for (var i = 0; i < children.length; i++) {
            angular.element(children[i]).removeClass(clazz);
        }
    };

    this.setArray = function() {
        scope.array = scope.data;
    };

    var setArray = function() {
        scope.array = scope.data;
    };

    var forEach = function (collection, func) {
        for (var i = 0; i < collection.length; i++) {
            func(collection[i], i);
        }
    };

    var executeAsynchronously = function (functions, timeout) {
        forEach(functions, function (func, index) {
            $timeout(function () {
                func();
            }, index * timeout);
        });
    };

};

module.exports = DataStructureCtrl;