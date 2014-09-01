'use strict';

var AstNode = require('./AstNode');
var PassNode = require('./PassNode');

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

module.exports = DoWhile;
