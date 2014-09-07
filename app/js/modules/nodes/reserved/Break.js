'use strict';
var AstNode = require('../AstNode');

module.exports = function() {
    var Break = function(line) {
        AstNode.call(this, line, line);
        this.compile = function (scope) {
            scope.toggleBreak();
            return scope;
        };
    };
    Break.prototype = Object.create(AstNode.prototype);
    return Break;
}();
