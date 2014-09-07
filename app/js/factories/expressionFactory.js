'use strict';

var AstNode = require('../modules/nodes/AstNode');

module.exports = function() {
    return {
	Expression: require('../modules/nodes/exp/Expression')(AstNode),
	Increment: require('../modules/nodes/exp/Increment')(AstNode),
	Assign: require('../modules/nodes/exp/Assign')(AstNode),
	Variable: require('../modules/nodes/exp/Variable')(AstNode)
    };
}();
