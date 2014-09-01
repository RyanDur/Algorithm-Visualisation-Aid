'use strict';

var Animations = require('./nodes/Animations');
var Prints = require('./nodes/Prints');
var type = require('../factories/typeFactory');
var flow = require('../factories/flowFactory');
var expression = require('../factories/expressionFactory');
var func = require('../factories/functionFactory');
var statement = require('../factories/statementFactory');

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

exports.stmnt = {
    Block: statement.Block,
    Line: statement.Line
};

exports.func = {
    Output: func.Output,
    FunctionCall: func.FunctionCall
};

exports.flow = {
    If: flow.If,
    While: flow.While,
    For: flow.For,
    DoWhile: flow.DoWhile
};

exports.type = {
    Arr: type.Arr,
    Boolean: type.Boolean,
    Number: type.Number
};

exports.exp = {
    Expression: expression.Expression,
    Increment: expression.Increment,
    Assign: expression.Assign,
    Variable: expression.Variable,
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
