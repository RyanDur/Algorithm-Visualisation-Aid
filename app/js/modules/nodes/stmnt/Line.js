'use strict';

module.exports = function(AstNode, PassNode, Animations, Searches) {
    var Line = function(line, column, val) {
        AstNode.call(this, line, column);
        this.compile = function(node) {
            node = new PassNode(node);
	    node = val.compile(node);
            var frame = this.frame;
	    node.searches = [];
	    var searches = new Searches();
	    var searched = searches.get();
	    searches.clear();
            new Animations().add(function($scope, editor) {
                $scope.searches = searched;
                frame($scope, editor);
            });
            return node;
        };
    };
    Line.prototype = Object.create(AstNode.prototype);
    return Line;
};
