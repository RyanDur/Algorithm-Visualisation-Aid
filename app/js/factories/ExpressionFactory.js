'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var PassNode = require('../modules/nodes/PassNode');

module.exports = function() {
    return {
	Expression: require('../modules/nodes/Expression')(AstNode, PassNode, Animations),
	Increment: require('../modules/nodes/Increment')(AstNode, PassNode),
	Assign: require('../modules/nodes/Assign')(AstNode, PassNode),
	Variable: require('../modules/nodes/Variable')(AstNode, PassNode, Animations)
    };
}();
