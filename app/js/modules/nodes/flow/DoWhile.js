'use strict';

module.exports = function (AstNode) {
    var DoWhile = function (first, last, block, cond) {
        AstNode.call(this, first, last);

        this.compile = function (scope) {
            do {
                scope = block.compile(scope);
                scope = cond.compile(scope);
            } while (scope.getValue());
            return scope;
        };
    };
    DoWhile.prototype = Object.create(AstNode.prototype);
    return DoWhile;
};
