'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var If = function (line, column, cond, block1, block2) {
        AstNode.call(this, line, column);
        this.compile = function (scope) {
            var searched = scope.getSearches();
            var frame = this.frame;
            scope.addAnimation(function ($scope, editor) {
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
}();
