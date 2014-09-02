'use strict';

module.exports = function(AstNode, PassNode, Animations) {
    var Arr = function(line, list) {
	AstNode.call(this, line, line);
	this.compile = function(node) {
            node = new PassNode(node);
	    var arr = [];
	    if(list) {
		for(var i = 0; i < list.length; i++) {
		    arr.push(list[i].compile(node).value);
		}
	    }
            node.value = arr.slice();
            var highlight = this.highlight;
            var data = arr;
            new Animations().add(function($scope, editor) {
		$scope.data = data;
		$scope.structure = 'array';
		highlight(editor);
            });

            return node;
	};
    };
    Arr.prototype = Object.create(AstNode.prototype);
    return Arr;
};
