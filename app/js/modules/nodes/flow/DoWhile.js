'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var DoWhile = function (first, last, block, cond) {
        AstNode.call(this, first, last);

        this.compile = function (scope) {
            do {
                scope = block.compile(scope);
            } while (cond.compile(scope).getValue());
            return scope;
        };
    };
    DoWhile.prototype = Object.create(AstNode.prototype);
    return DoWhile;
}();
