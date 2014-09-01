'use strict';

module.exports = function(AstNode, PassNode, Animations) {
    var NumberNode = function(line, num) {
	AstNode.call(this, line, line);
	this.compile = function(node) {
            new Animations().add(this.frame);
            node = new PassNode(node);
            node.value = Number(num);
            return node;
	};
    };
    NumberNode.prototype = Object.create(AstNode.prototype);
    return NumberNode;
};
