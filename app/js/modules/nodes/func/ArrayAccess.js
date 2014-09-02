'use strict';

module.exports = function (AstNode, PassNode, Animations) {
    var ArrayAccess = function(first,last, variable, arr) {
        AstNode.call(this, first, last);
        this.compile = function(node) {
            node = new PassNode(node);
            var a = variable.compile(node).value;
	    var index = arr[0].compile(node).value;
            node.value = a[index];
	    new Animations().add(function($scope, editor) {
		$scope.search = index;
	    });
            return node;
        };
    };
    ArrayAccess.prototype = Object.create(AstNode.prototype);
    return ArrayAccess;
};
