'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var PassNode = require('../modules/nodes/PassNode');

module.exports = function() {
    return {
	Expression: require('../modules/nodes/exp/Expression')(AstNode, PassNode, Animations),
	Increment: require('../modules/nodes/exp/Increment')(AstNode, PassNode),
	Assign: require('../modules/nodes/exp/Assign')(AstNode, PassNode),
	Variable: require('../modules/nodes/exp/Variable')(AstNode, PassNode, Animations)
    };
}();
