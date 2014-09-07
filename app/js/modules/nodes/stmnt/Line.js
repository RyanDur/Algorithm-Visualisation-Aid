'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var Line = function (line, column, val) {
        AstNode.call(this, line, column);
        this.compile = function (scope) {
            scope = val.compile(scope);
            scope.addAnimation(this.frame);
            return scope;
        };
    };
    Line.prototype = Object.create(AstNode.prototype);
    return Line;
}();