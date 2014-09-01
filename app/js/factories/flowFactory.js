'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var PassNode = require('../modules/nodes/PassNode');

module.exports = function() {
    return {
	If: require('../modules/nodes/flow/If')(AstNode, PassNode, Animations),
	While: require('../modules/nodes/flow/While')(AstNode, PassNode),
	For: require('../modules/nodes/flow/For')(AstNode, PassNode),
	DoWhile: require('../modules/nodes/flow/DoWhile')(AstNode, PassNode)
    };
}();
