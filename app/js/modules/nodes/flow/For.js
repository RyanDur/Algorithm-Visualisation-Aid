'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var For = function (first, last, decl, cond, exp, block) {
        AstNode.call(this, first, last);

        this.compile = function (scope) {
            scope.childScope();
            scope = decl.compile(scope);
            while (cond.compile(scope).getValue()) {
                scope.addAnimation(this.frame);
                scope = block.compile(scope);
                if (scope.getBreak()) {
                    scope.toggleBreak();
                    break;
                }
                scope = exp.compile(scope);
            }
            scope.parentScope();
            return scope;
        };
    };
    For.prototype = Object.create(AstNode.prototype);
    return For;
}();
