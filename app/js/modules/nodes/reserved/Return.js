'use strict';
var AstNode = require('../AstNode');

module.exports = function() {
    var Return = function(first, last, returnable) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            return returnable.compile(scope);
        };
    };
    Return.prototype = Object.create(AstNode.prototype);
    return Return;
}();
