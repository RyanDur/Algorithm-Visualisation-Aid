'use strict';

var Animations = require('../modules/nodes/Animations');
var AstNode = require('../modules/nodes/AstNode');
var Arr = require('../modules/nodes/type/Arr')(AstNode, Animations);
var Bool = require('../modules/nodes/type/Boolean')(AstNode, Animations);
var Num = require('../modules/nodes/type/Number')(AstNode, Animations);

module.exports = function () {
    return {
        Arr: function (line, list) {
            return new Arr(line, list);
        },
        Boolean: function (line, bool) {
            return new Bool(line, bool);
        },
        Number: function (line, num) {
            return new Num(line, num);
        }
    };
}();
