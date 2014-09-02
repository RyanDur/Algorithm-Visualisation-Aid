'use strict';

module.exports = function(AstNode, PassNode, Animations) {
    var FunctionCall = function(first, last, obj, method, params) {
	AstNode.call(this, first, last);
	this.compile = function(node) {
            node = new PassNode(node);
            var o = node.variables.get(obj.name);
            var value;
	    if (params) {
		value = params.compile(node).value;
		value = o.value[method](value);
	    } else {
		if(typeof o.value === 'function') {
		    value = o.value[method]();
		} else {
		    value = o.value[method];
		}
	    }
	    node.value = value;
            var data = value;
            new Animations().add(function($scope, editor) {
		$scope.data = data;
		$scope.structure = 'array';
            });
            return node;
	};
    };
    FunctionCall.prototype = Object.create(AstNode.prototype);
    return FunctionCall;
};
