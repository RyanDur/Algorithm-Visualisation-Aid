'use strict';

module.exports = function (AstNode, PassNode, Animations) {
    var ArrayAccess = function(first,last, variable, arr) {
        AstNode.call(this, first, last);
        this.compile = function(node) {
            node = new PassNode(node);
            var a = variable.compile(node).value;
	    var i = arr.slice(1,2);
	    var index;
	    console.log(i);
	    if(!isNaN(i)) {
		index = Number(i);
	    } else {
		index = node.variables.get(i).value;
	    }
            node.value = a[index];
	    console.log(index);
	    new Animations().add(function($scope, editor) {
		console.log('Access');
		$scope.search = index;
		console.log(index);
	    });
            return node;
        };
    };
    ArrayAccess.prototype = Object.create(AstNode.prototype);
    return ArrayAccess;
};
