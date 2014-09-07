'use strict';

var Exp = require('../modules/nodes/exp/Expression');
var Inc = require('../modules/nodes/exp/Increment');
var Assign = require('../modules/nodes/exp/Assign');
var Variable = require('../modules/nodes/exp/Variable');

module.exports = function () {
    return {
        Expression: function (first, last, stmnt1, stmnt2, func) {
            return new Exp(first, last, stmnt1, stmnt2, func);
        },
        Increment: function (line, variable) {
            return new Inc(line, variable);
        },
        Assign: function (first, last, variable, value) {
            return new Assign(first, last, variable, value);
        },
        Variable: function (line, variable) {
            return new Variable(line, variable);
        }
    };
}();
