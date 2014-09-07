'use strict';

var Exp = require('../modules/nodes/exp/Expression'),
    Inc = require('../modules/nodes/exp/Increment'),
    Assign = require('../modules/nodes/exp/Assign'),
    Variable = require('../modules/nodes/exp/Variable'),
    Decl = require('../modules/nodes/exp/Decl');

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
        },
        Decl: function(first, last, variable) {
            return new Decl(first, last, variable);
        }
    };
}();
