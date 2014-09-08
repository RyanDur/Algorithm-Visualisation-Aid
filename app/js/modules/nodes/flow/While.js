'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var While = function (first, last, cond, block) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            scope.childScope();
            scope = cond.compile(scope);
            while (scope.getValue()) {
                scope = block.compile(scope);
                if (scope.getBreak()) {
                    scope.toggleBreak();
                    break;
                }
                scope = cond.compile(scope);
            }
            scope.parentScope();
            return scope;
        };
    };
    While.prototype = Object.create(AstNode.prototype);
    return While;
}();
