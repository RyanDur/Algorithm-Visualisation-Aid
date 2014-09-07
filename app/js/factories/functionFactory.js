'use strict';

var AstNode = require('../modules/nodes/AstNode');
var Prints = require('../modules/nodes/Prints');
var Animations = require('../modules/nodes/Animations');
var Searches = require('../modules/nodes/Searches');

module.exports = function() {
    return {
	Output: require('../modules/nodes/func/Output')(AstNode, Prints),
	FunctionCall: require('../modules/nodes/func/FunctionCall')(AstNode, Animations),
	ArrayAccess: require('../modules/nodes/func/ArrayAccess')(AstNode, Searches)
    };
}();
