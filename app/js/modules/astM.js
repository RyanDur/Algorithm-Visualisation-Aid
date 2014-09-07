'use strict';
var Scope = require('./controllers/ScopeCtrl');
var Animations = require('./nodes/Animations');
var Prints = require('./nodes/Prints');
var Searches = require('./nodes/Searches');
var scope = new Scope(new Animations(), new Prints(), new Searches());

var type = require('../factories/typeFactory');
var flow = require('../factories/flowFactory');
var expression = require('../factories/expressionFactory');
var func = require('../factories/functionFactory');
var statement = require('../factories/statementFactory');
var reserved = require('../factories/reserveFactory');


var compile = function (stmnts, scope) {
    for (var i = 0; i < stmnts.length; i++) {
        scope = stmnts[i].compile(scope);
    }
    return scope;
};

exports.compile = function (node) {
    var returned = compile(node, scope);
    return {
        animation: returned.getAnimations(),
        print: returned.getPrints()
    };
};

exports.stmnt = {
    Block: statement.Block,
    Line: statement.Line
};

exports.func = {
    Output: func.Output,
    FunctionCall: func.FunctionCall,
    ArrayAccess: func.ArrayAccess
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

exports.reserved = {
    Break: reserved.Break,
    Return: reserved.Return
};

exports.exp = {
    Expression: expression.Expression,
    Increment: expression.Increment,
    Assign: expression.Assign,
    Variable: expression.Variable,
    Decl: expression.Decl,
    Add: function (left, right) {
        return left + right;
    },
    /**
     * @return {number}
     */
    Subtract: function (left, right) {
        return left - right;
    },
    /**
     * @return {number}
     */
    Multiply: function (left, right) {
        return left * right;
    },
    /**
     * @return {number}
     */
    Divide: function (left, right) {
        return left / right;
    },
    /**
     * @return {number}
     */
    Pow: function (left, right) {
        return Math.pow(left, right);
    },
    /**
     * @return {boolean}
     */
    Equal: function (left, right) {
        return left === right;
    },
    /**
     * @return {boolean}
     */
    Inequal: function (left, right) {
        return left !== right;
    },
    /**
     * @return {boolean}
     */
    LTE: function (left, right) {
        return left <= right;
    },
    /**
     * @return {boolean}
     */
    LT: function (left, right) {
        return left < right;
    },
    /**
     * @return {boolean}
     */
    GTE: function (left, right) {
        return left >= right;
    },
    /**
     * @return {boolean}
     */
    GT: function (left, right) {
        return left > right;
    }
};