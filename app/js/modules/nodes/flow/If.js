'use strict';

module.exports = function(AstNode, PassNode, Animations, Searches) {
    var If = function(line, column, cond, block1, block2) {
	AstNode.call(this, line, column);
	this.compile = function(node) {
            node = new PassNode(node);
	    node = cond.compile(node);

	    var searches = new Searches();
	    var searched = searches.get();
	    searches.clear();
	    var frame = this.frame;
	    new Animations().add(function($scope, editor) {
                $scope.searches = searched;
                frame($scope, editor);
            });

            if (node.value) {
		node = block1.compile(node);
            } else {
		if(block2) {
                    node = block2.compile(node);
		}
            }
            return node;
	};
    };
    If.prototype = Object.create(AstNode.prototype);
    return If;
};
