'use strict';
var Scope = require('./controllers/ScopeCtrl'),
    Animations = require('./nodes/Animations'),
    Prints = require('./nodes/Prints'),
    Searches = require('./nodes/Searches'),
    scope = new Scope(new Animations(), new Prints(), new Searches());

exports.stmnt = require('../factories/statementFactory');
exports.func = require('../factories/functionFactory');
exports.flow = require('../factories/flowFactory');
exports.type = require('../factories/typeFactory');
exports.reserved = require('../factories/reserveFactory');
exports.exp = require('../factories/expressionFactory');

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

exports.op = {
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