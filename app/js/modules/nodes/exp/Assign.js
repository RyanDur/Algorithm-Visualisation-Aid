'use strict';

module.exports = function(AstNode, PassNode) {
    var Assign = function(first, last, variable, value) {
	AstNode.call(this, first, last);
	this.compile = function(node) {
            node = new PassNode(node);
            node.variables.add(variable.name, value.compile(node));
            node.name = variable.name;
            return node;
	};
    };
    Assign.prototype = Object.create(AstNode.prototype);
    return Assign;
};
