'use strict';
var AstNode = require('../AstNode');

//from http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
module.exports = function () {
    var FunctionCall = function (first, last, obj, method, params) {
        AstNode.call(this, first, last);
        this.compile = function (scope) {
            var variable = scope.getVariable(obj.name);
            if (params) {
                scope = params.compile(scope);
                scope.setValue(variable[method](scope.getValue()));
            } else {
                if (isFunction(variable[method])) {
                    scope.setValue(variable[method]());
                } else {
                    scope.setValue(variable[method]);
                }
            }
            var data = variable.slice();
            var frame = this.frame;
            scope.addAnimation(function ($scope, editor) {
                $scope.data = data;
                $scope.structure = 'array';
                $scope.method = method;
                frame($scope, editor);
            });
            return scope;
        };
    };
    FunctionCall.prototype = Object.create(AstNode.prototype);
    return FunctionCall;
}();
