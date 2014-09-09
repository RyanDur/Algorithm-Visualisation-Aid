'use strict';
var ScopeCtrl = require('./controllers/ScopeCtrl'),
    AnimationCtrl = require('./controllers/AnimationCtrl'),
    PrintCtrl = require('./controllers/PrintCtrl'),
    scope = new ScopeCtrl(new AnimationCtrl(), new PrintCtrl());

exports.stmnt = require('../factories/statementFactory');
exports.func = require('../factories/functionFactory');
exports.flow = require('../factories/flowFactory');
exports.type = require('../factories/typeFactory');
exports.reserved = require('../factories/reserveFactory');
exports.exp = require('../factories/expressionFactory');



var AstNode = require('./nodes/AstNode');
exports.AccessToAccess = function(first, last, arr1, param1, arr2, param2) {
    AstNode.call(this, first, last);
    this.compile = function(scope) {
        var array1 = arr1.compile(scope).getValue();
        var index1 = param1.compile(scope).getValue();
        var array2 = arr2.compile(scope).getValue();
        var index2 = param2.compile(scope).getValue();
        var data1 = array2.slice();
        array1[index1] = array2[index2];
        var data = array1.slice();
        var frame = this.frame;
        scope.addAnimation(function($scope, editor) {
            $scope.ata = {
                oldData: data1,
                newData: data,
                leftIndex: index1,
                rightIndex: index2
            };
            $scope.method = 'ata';
            frame($scope, editor);
        });
        scope.setValue(array1);
        return scope;
    };
};
exports.AccessToAccess.prototype = Object.create(AstNode.prototype);
exports.AnswerToAccess = function(first, last, arr, param, answer) {
    AstNode.call(this, first, last);
    this.compile = function(scope) {

        return scope;
    };
};
exports.AnswerToAccess.prototype = Object.create(AstNode.prototype);
exports.AccessToExp = function(first, last, exp, arr, param) {
    AstNode.call(this, first, last);
    this.compile = function(scope) {
        var array = arr.compile(scope).getValue();
        var index = param.compile(scope).getValue();
        var name = exp.name;
        var value = array[index];
        scope.addVariable(name, value);
        var frame = this.frame;
        scope.addAnimation(function($scope, editor) {
            $scope.variable = {
                name: name,
                value: value,
                index: index
            };
            frame($scope, editor);
        });
        return scope;
    };
};
exports.AccessToExp.prototype = Object.create(AstNode.prototype);





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