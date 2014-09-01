'use strict';

module.exports = function(AstNode, PassNode) {
    var Variable = function (line, variable) {
	AstNode.call(this, line, line);
	this.name = variable;
	this.compile = function(node) {
            node = new PassNode(node);
            node.value = node.variables.get(this.name).value;
            return node;
	};
    };
    Variable.prototype = Object.create(AstNode.prototype);
    return Variable;
};
