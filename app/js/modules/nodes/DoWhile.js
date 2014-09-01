'use strict';

module.exports = function(AstNode, PassNode) {
    var DoWhile = function(first, last, block, cond) {
	AstNode.call(this, first, last);

	this.compile = function(node) {
            node = new PassNode(node);
            do {
		node = block.compile(node);
            } while(cond.compile(node).value);
            return node;
	};
    };
    DoWhile.prototype = Object.create(AstNode.prototype);
    return DoWhile;
};
