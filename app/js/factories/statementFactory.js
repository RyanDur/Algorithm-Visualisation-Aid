'use strict';

var Block = require('../modules/nodes/stmnt/Block');
var Line = require('../modules/nodes/stmnt/Line');

module.exports = function () {
    return {
        Block: function (first, last, stmnt) {
            return new Block(first, last, stmnt);
        },
        Line: function (first, last, stmnt) {
            return new Line(first, last, stmnt);
        }
    };
}();
