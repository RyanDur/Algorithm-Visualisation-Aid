'use strict';

module.exports = function(AstNode, PassNode) {
    var BooleanNode = function(line, bool) {
        AstNode.call(this, line, line);
        this.compile = function(node) {
            node = new PassNode(node);
            node.value = bool;
            return node;
        };
    };
    BooleanNode.prototype = Object.create(AstNode.prototype);
    return BooleanNode;
};
