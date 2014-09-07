'use strict';

module.exports = function (AstNode) {
    var Variable = function (line, variable) {
        AstNode.call(this, line, line);
        this.name = variable;
        this.compile = function (scope) {
            scope.setValue(scope.getVariable(variable));
            return scope;
        };
    };
    Variable.prototype = Object.create(AstNode.prototype);
    return Variable;
};
