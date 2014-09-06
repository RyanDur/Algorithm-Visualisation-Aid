'use strict';

module.exports = function(AstNode, PassNode) {
    var Variable = function (line, variable) {
	AstNode.call(this, line, line);
	this.name = variable;
	this.compile = function(node) {
            node = new PassNode(node);
	    var value = node.variables.get(this.name).value;
            node.value = value;
            return node;
	};
    };
    Variable.prototype = Object.create(AstNode.prototype);
    return Variable;
};
