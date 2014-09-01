'use strict';

var Prints = require('./nodes/Prints');
var Animations = require('./nodes/Animations');
var PassNode = require('./nodes/PassNode');

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

exports.Add = function(stmnt1, stmnt2) {
    return stmnt1.value + stmnt2.value;
};

exports.Subtract = function(stmnt1, stmnt2) {
    return stmnt1.value - stmnt2.value;
};

exports.Multiply = function(stmnt1, stmnt2) {
    return stmnt1.value * stmnt2.value;
};

exports.Divide = function(stmnt1, stmnt2) {
    return stmnt1.value / stmnt2.value;
};

exports.Pow = function(stmnt1, stmnt2) {
    return Math.pow(stmnt1.value, stmnt2.value);
};

exports.Equal = function(stmnt1, stmnt2) {
    return stmnt1.value === stmnt2.value;
};

exports.Inequal = function(stmnt1, stmnt2) {
    return stmnt1.value !== stmnt2.value;
};

exports.LTE = function(stmnt1, stmnt2) {
    return stmnt1.value <= stmnt2.value;
};

exports.LT = function(stmnt1, stmnt2) {
    return stmnt1.value < stmnt2.value;
};

exports.GTE = function(stmnt1, stmnt2) {
    return stmnt1.value >= stmnt2.value;
};
