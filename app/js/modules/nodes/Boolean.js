'use strict';

var AstNode = require('./AstNode');
var Animations = require('./Animations');
var PassNode = require('./PassNode');

var BooleanNode = function(line, bool) {
    AstNode.call(this, line, line);
    this.compile = function(node) {
        node = new PassNode(node);
        new Animations().add(this.frame);
        node.value = bool;

        return node;
    };
};
BooleanNode.prototype = Object.create(AstNode.prototype);

module.exports = BooleanNode;
