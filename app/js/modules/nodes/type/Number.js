'use strict';

module.exports = function(AstNode, PassNode) {
    var NumberNode = function(line, num) {
	AstNode.call(this, line, line);
	this.compile = function(node) {
            node = new PassNode(node);
            node.value = Number(num);
            return node;
	};
    };
    NumberNode.prototype = Object.create(AstNode.prototype);
    return NumberNode;
};
