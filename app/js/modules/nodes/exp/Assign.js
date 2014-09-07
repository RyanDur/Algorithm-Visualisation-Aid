'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var Assign = function (first, last, variable, value) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            scope = value.compile(scope);
            scope.addVariable(variable.name, scope.getValue());
            return scope;
        };
    };
    Assign.prototype = Object.create(AstNode.prototype);
    return Assign;
}();
