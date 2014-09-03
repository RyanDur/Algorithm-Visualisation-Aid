'use strict';

module.exports = function(AstNode, PassNode, Animations) {
    var FunctionCall = function(first, last, obj, method, params) {
	AstNode.call(this, first, last);
	this.compile = function(node) {
            node = new PassNode(node);
            var o = node.variables.get(obj.name);
	    if (params) {
		var value = params.compile(node).value;
		node.value = o.value[method](value);
	    } else {
		if(typeof o.value === 'function') {
		    node.value = o.value[method]();
		} else {
		    node.value = o.value[method];
		}
	    }
	    var data = o.value.slice();
	    new Animations().add(function($scope, editor){
		$scope.data = data;
		$scope.structure = 'array';
	    });
            return node;
	};
    };
    FunctionCall.prototype = Object.create(AstNode.prototype);
    return FunctionCall;
};
