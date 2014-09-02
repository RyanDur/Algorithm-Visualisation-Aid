'use strict';

module.exports = function(AstNode, PassNode, Animations) {
    var FunctionCall = function(first, last, obj, method, params) {
	AstNode.call(this, first, last);
	this.compile = function(node) {
            node = new PassNode(node);
            var o = node.variables.get(obj.name);
            var value;
	    var ret;
	    if (params) {
		value = params.compile(node).value;
		ret = o.value[method](value);
	    } else {
		if(typeof o.value === 'function') {
		    ret = o.value[method]();
		} else {
		    ret = o.value[method];
		}
	    }
	    node.value = ret;
            var data = o.value.slice();
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
