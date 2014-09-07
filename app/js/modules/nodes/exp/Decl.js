'use strict';
var AstNode = require('../AstNode');

module.exports = function() {
    var Decl = function(first, last, variable) {
        AstNode.call(this, first, last);
        this.compile = function(scope) {
            scope.addVariable(variable.name, variable.compile(scope));
            return scope;
        };
    };
    Decl.prototype = Object.create(AstNode.prototype);
    return Decl;
}();