'use strict';

var Prints = require('./nodes/Prints');
var Animations = require('./nodes/Animations');
var AstNode = require('./nodes/AstNode');
var PassNode = require('./nodes/PassNode');

//Lines
exports.Expression = require('./nodes/Expression')(AstNode, PassNode, Animations);
exports.Block = require('./nodes/Block')(AstNode, PassNode);
exports.Line = require('./nodes/Line')(AstNode, PassNode, Animations);

//flow
exports.If = require('./nodes/If')(AstNode, PassNode, Animations);
exports.While = require('./nodes/While')(AstNode, PassNode);
exports.For = require('./nodes/For')(AstNode, PassNode);
exports.DoWhile = require('./nodes/DoWhile')(AstNode, PassNode);

//Types
exports.Arr = require('./nodes/Arr')(AstNode, PassNode, Animations);
exports.Boolean = require('./nodes/Boolean')(AstNode, PassNode, Animations);
exports.Number = require('./nodes/Number')(AstNode, PassNode, Animations);
exports.Variable = require('./nodes/Variable')(AstNode, PassNode);

//Functions
exports.Increment = require('./nodes/Increment')(AstNode, PassNode);
exports.Assign = require('./nodes/Assign')(AstNode, PassNode);
exports.Output = require('./nodes/Output')(AstNode, PassNode, Animations, Prints);
exports.FunctionCall = require('./nodes/FunctionCall')(AstNode, PassNode, Animations);

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
