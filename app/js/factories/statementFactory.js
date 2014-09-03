'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var PassNode = require('../modules/nodes/PassNode');
var Searches = require('../modules/nodes/Searches');

module.exports = function() {
    return {
	Block: require('../modules/nodes/stmnt/Block')(AstNode, PassNode),
	Line: require('../modules/nodes/stmnt/Line')(AstNode, PassNode, Animations, Searches)
    };
}();
