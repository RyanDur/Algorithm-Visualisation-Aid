'use strict';

var AstNode = require('./AstNode');
var PassNode = require('./PassNode');

var compile = function(stmnts, node) {
    var passNode = node;
    for (var i = 0; i < stmnts.length; i++) {
        passNode = stmnts[i].compile(passNode);
    }
    return passNode;
};

var Block = function(first, last, stmnts) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        var keys = node.variables.getKeys();
        node = compile(stmnts, node);
        node.variables.removeChildScope(keys);
        return node;
    };
};
Block.prototype = Object.create(AstNode.prototype);

module.exports = Block;
