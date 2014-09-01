'use strict';

var AstNode = require('./AstNode');
var PassNode = require('./PassNode');

var While = function(first, last, cond, block) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        while(cond.compile(node).value) {
            node = block.compile(node);
        }
        return node;
    };
};
While.prototype = Object.create(AstNode.prototype);

module.exports = While;
