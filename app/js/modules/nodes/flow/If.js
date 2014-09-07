'use strict';

module.exports = function (AstNode, Animations, Searches) {
    var If = function (line, column, cond, block1, block2) {
        AstNode.call(this, line, column);
        this.compile = function (scope) {
            var searches = new Searches();
            var searched = searches.get();
            searches.clear();
            var frame = this.frame;
            new Animations().add(function ($scope, editor) {
                $scope.searches = searched;
                frame($scope, editor);
            });
            scope = cond.compile(scope);
            if (scope.getValue()) {
                scope = block1.compile(scope);
            } else {
                if (block2) {
                    scope = block2.compile(scope);
                }
            }
            return scope;
        };
    };
    If.prototype = Object.create(AstNode.prototype);
    return If;
};
