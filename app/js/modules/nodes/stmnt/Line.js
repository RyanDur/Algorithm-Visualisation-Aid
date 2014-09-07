'use strict';

module.exports = function (AstNode, Animations, Searches) {
    var Line = function (line, column, val) {
        AstNode.call(this, line, column);
        this.compile = function (scope) {

            var frame = this.frame;
            var searches = new Searches();
            var searched = searches.get();
            searches.clear();

            scope = val.compile(scope);
            new Animations().add(function ($scope, editor) {
                $scope.searches = searched;
                frame($scope, editor);
            });
            return scope;
        };
    };
    Line.prototype = Object.create(AstNode.prototype);
    return Line;
};
