'use strict';

module.exports = function(AstNode, PassNode, Animations) {
    var Arr = function(line, list) {
	AstNode.call(this, line, line);
	this.compile = function(node) {
            node = new PassNode(node);
            var arr = list.replace(/\[(.*?)\]/g,"$1").split(',').map(function(item) {
		return parseInt(item, 10);
            });
	    if((arr+'') === 'NaN') {arr = [];}
            node.value = arr;
            var highlight = this.highlight;
            var data = arr.slice();
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
