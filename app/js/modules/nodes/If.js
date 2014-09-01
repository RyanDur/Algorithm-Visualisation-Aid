'use strict';

module.exports = function(AstNode, PassNode, Animations) {
    var If = function(line, column, cond, block1, block2) {
	AstNode.call(this, line, column);
	this.compile = function(node) {
            node = new PassNode(node);
            var animations = new Animations();
            if (cond.compile(node).value) {
		node = block1.compile(node);
            } else {
		if(block2) {
                    node = block2.compile(node);
		}
            }
            animations.add(this.frame);

            return node;
	};
    };
    If.prototype = Object.create(AstNode.prototype);
    return If;
};
