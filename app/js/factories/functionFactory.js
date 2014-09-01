'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var PassNode = require('../modules/nodes/PassNode');
var Prints = require('../modules/nodes/Prints');

module.exports = function() {
    return {
	Output: require('../modules/nodes/Output')(AstNode, PassNode, Animations, Prints),
	FunctionCall: require('../modules/nodes/FunctionCall')(AstNode, PassNode, Animations)
    };
}();
