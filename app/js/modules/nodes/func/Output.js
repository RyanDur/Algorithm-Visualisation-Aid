'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var Output = function (first, last, toPrint, type) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            scope = toPrint.compile(scope);
            if (scope.getValue() !== undefined) {
                if (type === 'print') {
                    scope.addPrint(scope.getValue());
                }
                else if (type === 'println') {
                    scope.addPrint(scope.getValue() + '\n');
                }
            }
            return scope;
        };
    };
    Output.prototype = Object.create(AstNode.prototype);
    return Output;
}();
