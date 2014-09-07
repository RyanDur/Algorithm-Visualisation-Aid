'use strict';

module.exports = function (AstNode, Animations) {
    var Arr = function (line, list) {
        AstNode.call(this, line, line);
        this.compile = function (scope) {
            var arr = [];
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    arr.push(list[i].compile(scope).getValue());
                }
            }
            var frame = this.frame;
            new Animations().add(function ($scope, editor) {
                $scope.data = arr.slice();
                $scope.structure = 'array';
                frame($scope, editor);
            });
            scope.setValue(arr);
            return scope;
        };
    };
    Arr.prototype = Object.create(AstNode.prototype);
    return Arr;
};
