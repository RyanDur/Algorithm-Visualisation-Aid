'use strict';

var AstNode = require('./AstNode');
var Animations = require('./Animations');
var PassNode = require('./PassNode');

var NumberNode = function(line, num) {
    AstNode.call(this, line, line);
    this.compile = function(node) {
        new Animations().add(this.frame);
        node = new PassNode(node);
        node.value = Number(num);
        return node;
    };
};
NumberNode.prototype = Object.create(AstNode.prototype);

module.exports = NumberNode;
