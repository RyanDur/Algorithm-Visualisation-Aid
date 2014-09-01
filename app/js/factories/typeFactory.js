'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var PassNode = require('../modules/nodes/PassNode');

module.exports = function() {
    return {
	Arr: require('../modules/nodes/type/Arr')(AstNode, PassNode, Animations),
	Boolean: require('../modules/nodes/type/Boolean')(AstNode, PassNode, Animations),
	Number: require('../modules/nodes/type/Number')(AstNode, PassNode, Animations)
    };
}();
