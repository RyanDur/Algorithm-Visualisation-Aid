'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var ArrayAccess = function (first, last, variable, arr) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            var a = variable.compile(scope).getValue();
            var index = arr[0].compile(scope).getValue();
            scope.addSearch(index);
            scope.setValue(a[index]);
            return scope;
        };
    };
    ArrayAccess.prototype = Object.create(AstNode.prototype);
    return ArrayAccess;
}();
