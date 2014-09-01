'use strict';

var AstNode = require('./AstNode');
var Animations = require('./Animations');
var PassNode = require('./PassNode');
var Prints = require('./Prints');

var Output = function(first, last, toPrint, type) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        node = toPrint.compile(node);
        new Animations().add(this.frame);
        if (type === 'print') {this.print = node.value;}
        else if (type === 'println') {this.print = node.value + '\n';}
        new Prints().add(this.print);
        return node;
    };
};
Output.prototype = Object.create(AstNode.prototype);

module.exports = Output;
