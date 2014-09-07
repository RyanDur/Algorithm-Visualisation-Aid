'use strict';

module.exports = function (AstNode, Animations) {
    var For = function (first, last, decl, cond, exp, block) {
        AstNode.call(this, first, last);

        this.compile = function (scope) {
            scope.childScope();
            scope = decl.compile(scope);
            while (cond.compile(scope).getValue()) {
                new Animations().add(this.frame);
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
};
