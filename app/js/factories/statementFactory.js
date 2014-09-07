'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var Searches = require('../modules/nodes/Searches');

module.exports = function() {
    return {
	Block: require('../modules/nodes/stmnt/Block')(AstNode),
	Line: require('../modules/nodes/stmnt/Line')(AstNode, Animations, Searches)
    };
}();
