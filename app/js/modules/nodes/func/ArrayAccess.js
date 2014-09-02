'use strict';

module.exports = function (AstNode, PassNode) {
    var ArrayAccess = function(first,last, variable, arr) {
        AstNode.call(this, first, last);
        this.compile = function(node) {
            node = new PassNode(node);
            var a = variable.compile(node).value;
            var index = Number(arr.slice(1,2));
            node.value = a[index];
            return node;
        };
    };
    ArrayAccess.prototype = Object.create(AstNode.prototype);
    return ArrayAccess;
};
