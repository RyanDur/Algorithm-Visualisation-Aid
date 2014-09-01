'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var PassNode = require('../modules/nodes/PassNode');

module.exports = function() {
    return {
	Block: require('../modules/nodes/Block')(AstNode, PassNode),
	Line: require('../modules/nodes/Line')(AstNode, PassNode, Animations)
    };
}();
