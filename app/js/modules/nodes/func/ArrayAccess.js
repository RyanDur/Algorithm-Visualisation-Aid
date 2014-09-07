'use strict';

module.exports = function (AstNode, Searches) {
    var ArrayAccess = function (first, last, variable, arr) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            var a = variable.compile(scope).getValue();
            var index = arr[0].compile(scope).getValue();
            new Searches().add(index);
            scope.setValue(a[index]);
            return scope;
        };
    };
    ArrayAccess.prototype = Object.create(AstNode.prototype);
    return ArrayAccess;
};
