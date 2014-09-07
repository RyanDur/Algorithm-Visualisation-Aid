'use strict';

module.exports = function(AstNode) {
    var Expression = function(first, last, stmnt1, stmnt2, func) {
        AstNode.call(this, first, last);
        this.compile = function(scope) {
            var a = stmnt1.compile(scope).getValue();
            var b = stmnt2.compile(scope).getValue();
            scope.setValue(func(a, b));
            return scope;
        };
    };
    Expression.prototype = Object.create(AstNode.prototype);
    return Expression;
};
