'use strict';

var AstNode = require('./AstNode');
var PassNode = require('./PassNode');

var For = function(first, last, decl, cond, exp, block) {
    AstNode.call(this, first, last);

    this.compile = function(node) {
        node = new PassNode(node);
        var keys = node.variables.getKeys();
        node = decl.compile(node);
        while(cond.compile(node).value) {
            node = block.compile(node);
            node = exp.compile(node);
        }
        node.variables.removeChildScope(keys);
        return node;
    };
};
For.prototype = Object.create(AstNode.prototype);

module.exports = For;
