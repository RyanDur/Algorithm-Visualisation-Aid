'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var Searches = require('../modules/nodes/Searches');

module.exports = function() {
    return {
	If: require('../modules/nodes/flow/If')(AstNode, Animations, Searches),
	While: require('../modules/nodes/flow/While')(AstNode),
	For: require('../modules/nodes/flow/For')(AstNode, Animations),
	DoWhile: require('../modules/nodes/flow/DoWhile')(AstNode)
    };
}();
