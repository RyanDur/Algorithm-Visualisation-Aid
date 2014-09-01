'use strict';

var Prints = require('./nodes/Prints');
var Animations = require('./nodes/Animations');

exports.Line = require('./nodes/Line');
exports.Number = require('./nodes/Number');
exports.Variable = require('./nodes/Variable');
exports.Assign = require('./nodes/Assign');
exports.Output = require('./nodes/Output');
exports.If = require('./nodes/If');
exports.Arr = require('./nodes/Arr');
exports.Expression = require('./nodes/Expression');
exports.Boolean = require('./nodes/Boolean');
exports.Block = require('./nodes/Block');
exports.While = require('./nodes/While');
exports.DoWhile = require('./nodes/DoWhile');
exports.Increment = require('./nodes/Increment');
exports.For = require('./nodes/For');
exports.FunctionCall = require('./nodes/FunctionCall');

var compile = function(stmnts, node) {
    var passNode = node;
    for (var i = 0; i < stmnts.length; i++) {
        passNode = stmnts[i].compile(passNode);
    }
    return passNode;
};

exports.compile = function(node) {
    compile(node);
    var result = {
        animation: new Animations().get(),
        print: new Prints().get()
    };
    new Prints().clear();
    new Animations().clear();
    return result;
};

exports.exp = {
    Add: function(stmnt1, stmnt2) {
        return stmnt1.value + stmnt2.value;
    },
    Subtract: function(stmnt1, stmnt2) {
        return stmnt1.value - stmnt2.value;
    },
    Multiply: function(stmnt1, stmnt2) {
        return stmnt1.value * stmnt2.value;
    },
    Divide: function(stmnt1, stmnt2) {
        return stmnt1.value / stmnt2.value;
    },
    Pow: function(stmnt1, stmnt2) {
        return Math.pow(stmnt1.value, stmnt2.value);
    },
    Equal: function(stmnt1, stmnt2) {
        return stmnt1.value === stmnt2.value;
    },
    Inequal: function(stmnt1, stmnt2) {
	return stmnt1.value !== stmnt2.value;
    },
    LTE: function(stmnt1, stmnt2) {
	return stmnt1.value <= stmnt2.value;
    },
    LT: function(stmnt1, stmnt2) {
	return stmnt1.value < stmnt2.value;
    },
    GTE: function(stmnt1, stmnt2) {
	return stmnt1.value >= stmnt2.value;
    },
    GT: function(stmnt1, stmnt2) {
	return stmnt1.value > stmnt2.value;
    }
};
