'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var While = function (first, last, cond, block) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            scope = cond.compile(scope);
            while (scope.getValue()) {
                scope.childScope();
                scope = block.compile(scope);
                scope.parentScope();
                scope = cond.compile(scope);
            }
            return scope;
        };
    };
    While.prototype = Object.create(AstNode.prototype);
    return While;
}();
