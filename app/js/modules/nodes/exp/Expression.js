'use strict';

module.exports = function(AstNode, PassNode) {
    var Expression = function(first, last, stmnt1, stmnt2, func) {
	AstNode.call(this, first, last);
	this.compile = function(node) {
            node = new PassNode(node);
            var node1;
            var node2;
            if(stmnt1.name) {
		node1 = node.variables.get(stmnt1.name);
		node2 = stmnt2.compile(node);
            } else if(stmnt2.name) {
		node1 = stmnt1.compile(node);
		node2 = node.variables.get(stmnt2.name);
            } else {
		node1 = stmnt1.compile(node);
		node2 = stmnt2.compile(node);
            }
            node.value = func(node1, node2);
            return node;
	};
    };
    Expression.prototype = Object.create(AstNode.prototype);
    return Expression;
};
