'use strict';
//from http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
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
		if(isFunction(o.value[method])) {
		    node.value = o.value[method]();
		} else {
		    node.value = o.value[method];
		}
	    }
	    var data = o.value.slice();
	    var frame = this.frame;
	    new Animations().add(function($scope, editor){
		$scope.data = data;
		$scope.structure = 'array';
		$scope.method = method;
		frame($scope, editor);
	    });
            return node;
	};
    };
    FunctionCall.prototype = Object.create(AstNode.prototype);
    return FunctionCall;
};
