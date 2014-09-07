'use strict';
var AstNode = require('../AstNode');

module.exports = function () {
    var Line = function (line, column, val) {
        AstNode.call(this, line, column);
        this.compile = function (scope) {

            var frame = this.frame;
            var searched = scope.getSearches();

            scope = val.compile(scope);
            scope.addAnimation(function ($scope, editor) {
                $scope.searches = searched;
                frame($scope, editor);
            });
            return scope;
        };
    };
    Line.prototype = Object.create(AstNode.prototype);
    return Line;
}();