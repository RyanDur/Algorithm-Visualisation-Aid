'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var NumberNode = function (line, num) {
        AstNode.call(this, line, line);
        this.compile = function (scope) {
            scope.setValue(Number(num));
            return scope;
        };
    };
    NumberNode.prototype = Object.create(AstNode.prototype);
    return NumberNode;
}();
