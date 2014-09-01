'use strict';

var AstNode = require('./AstNode');
var Animations = require('./Animations');
var PassNode = require('./PassNode');

var Line = function(line, column, val) {
    AstNode.call(this, line, column);
    this.compile = function(node) {
        new Animations().add(this.frame);
        node = new PassNode(node);
        return val.compile(node);
    };
};
Line.prototype = Object.create(AstNode.prototype);

module.exports = Line;
