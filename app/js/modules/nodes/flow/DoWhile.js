'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var DoWhile = function (first, last, block, cond) {
        AstNode.call(this, first, last);

        this.compile = function (scope) {
            scope.childScope();
            do {
                scope = block.compile(scope);
                if (scope.getBreak()) {
                    scope.toggleBreak();
                    break;
                }
            } while (cond.compile(scope).getValue());
            scope.parentScope();
            return scope;
        };
    };
    DoWhile.prototype = Object.create(AstNode.prototype);
    return DoWhile;
}();
