'use strict';

module.exports = function(AstNode, PassNode) {
    var Increment = function(line, stmnt) {
	AstNode.call(this, line, line);
	var variable = stmnt.replace('++', '');
	this.compile = function(node) {
            node = new PassNode(node);
            node = node.variables.get(variable);
            node.value += 1;
	    node.variables.add(variable, node);
            return node;
	};
    };
    Increment.prototype = Object.create(AstNode.prototype);
    return Increment;
};
