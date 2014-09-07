'use strict';

module.exports = function(AstNode) {
    var BooleanNode = function(line, bool) {
        AstNode.call(this, line, line);
        this.compile = function(scope) {
            scope.setValue(bool);
            return scope;
        };
    };
    BooleanNode.prototype = Object.create(AstNode.prototype);
    return BooleanNode;
};
