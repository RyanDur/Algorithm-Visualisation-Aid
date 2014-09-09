'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var ArrayAccess = function (first, last, arr, variable) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            var array = arr.compile(scope).getValue();
            var index = variable.compile(scope).getValue();
            scope.setValue(array[index]);
            var frame = this.frame;
            scope.addAnimation(function ($scope, editor) {
                $scope.search = index;
                frame($scope, editor);
            });
            return scope;
        };
    };
    ArrayAccess.prototype = Object.create(AstNode.prototype);
    return ArrayAccess;
}();
