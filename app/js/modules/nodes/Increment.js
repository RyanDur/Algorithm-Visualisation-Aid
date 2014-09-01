'use strict';

module.exports = function(AstNode, PassNode) {
    var Increment = function(line, stmnt) {
	AstNode.call(this, line, line);
	var variable = stmnt.replace('++', '');
	this.compile = function(node) {
            node = new PassNode(node);
            var incrementable = node.variables.get(variable);
            incrementable.value++;
            return node;
	};
    };
    Increment.prototype = Object.create(AstNode.prototype);
    return Increment;
};