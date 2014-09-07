'use strict';

var compile = function (stmnts, scope) {
    for (var i = 0; i < stmnts.length; i++) {
        scope = stmnts[i].compile(scope);
    }
    return scope;
};

module.exports = function (AstNode) {
    var Block = function (first, last, stmnts) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            scope.childScope();
            scope = compile(stmnts, scope);
            scope.parentScope();
            return scope;
        };
    };
    Block.prototype = Object.create(AstNode.prototype);
    return Block;
};
