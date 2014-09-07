'use strict';

module.exports = function (AstNode, Prints) {
    var Output = function (first, last, toPrint, type) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            scope = toPrint.compile(scope);
            if(scope.getValue() !== undefined) {
                if (type === 'print') {
                    new Prints().add(scope.getValue());
                }
                else if (type === 'println') {
                    new Prints().add(scope.getValue() + '\n');
                }
            }
            return scope;
        };
    };
    Output.prototype = Object.create(AstNode.prototype);
    return Output;
};
