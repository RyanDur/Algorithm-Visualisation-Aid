'use strict';

module.exports = function (AstNode) {
    var Increment = function (line, stmnt) {
        AstNode.call(this, line, line);
        var variable = stmnt.replace('++', '');
        this.compile = function (scope) {
            var value = scope.getVariable(variable);
            value += 1;
            scope.addVariable(variable, value);
            return scope;
        };
    };
    Increment.prototype = Object.create(AstNode.prototype);
    return Increment;
};
