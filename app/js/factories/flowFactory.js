'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var PassNode = require('../modules/nodes/PassNode');

module.exports = function() {
    return {
	If: require('../modules/nodes/If')(AstNode, PassNode, Animations),
	While: require('../modules/nodes/While')(AstNode, PassNode),
	For: require('../modules/nodes/For')(AstNode, PassNode),
	DoWhile: require('../modules/nodes/DoWhile')(AstNode, PassNode)
    };
}();
