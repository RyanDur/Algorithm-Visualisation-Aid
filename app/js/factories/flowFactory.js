'use strict';

var IfStmnt = require('../modules/nodes/flow/If');
var While = require('../modules/nodes/flow/While');
var For = require('../modules/nodes/flow/For');
var DoWhile = require('../modules/nodes/flow/DoWhile');

module.exports = function () {
    return {
        If: function (first, last, cond, block1, block2) {
            return new IfStmnt(first, last, cond, block1, block2);
        },
        While: function (first, last, cond, block) {
            return new While(first, last, cond, block);
        },
        For: function (first, last, decl, cond, exp, block) {
            return new For(first, last, decl, cond, exp, block);
        },
        DoWhile: function (first, last, block, cond) {
            return new DoWhile(first, last, block, cond);
        }
    };
}();
