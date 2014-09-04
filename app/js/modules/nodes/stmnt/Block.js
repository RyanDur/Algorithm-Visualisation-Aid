'use strict';

var compile = function(stmnts, node) {
    var passNode = node;
    for (var i = 0; i < stmnts.length; i++) {
	passNode = stmnts[i].compile(passNode);
        if (passNode.ret === true) {
            return passNode;
        }
    }
    return passNode;
};

module.exports = function(AstNode, PassNode) {
    var Block = function(first, last, stmnts) {
        AstNode.call(this, first, last);
        this.compile = function(node) {
            node = new PassNode(node);
            var keys = node.variables.getKeys();
            node = compile(stmnts, node);
            node.variables.removeChildScope(keys);
            return node;
        };
    };
    Block.prototype = Object.create(AstNode.prototype);
    return Block;
};
