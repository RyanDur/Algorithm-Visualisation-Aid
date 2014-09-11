'use strict';

module.exports = function ($timeout) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            variable: "=",
            clear: "="
        },
        templateUrl: "templates/variables.html",
        link: function (scope, elem) {
            scope.variables = {};
            scope.$watch("clear", function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $timeout(function () {
                        elem.find('.variable')
                            .addClass('conceal')
                            .offset({top: 0});
                    }, 100);
                    $timeout(function () {
                        scope.variables = {};
                    }, 1000);
                }
            });
            scope.$watch('variable', function (newVal, oldVal) {
                var variable;
                if (newVal !== oldVal) {
                    if (scope.variable) {
                        variable = getVariable(scope);
                        if (scope.variable.method === 'get') {

                            scope.variables[scope.variable.name] = scope.variable.value;
                            $timeout(function () {
                                variable = setup();
                            }, 10);
                            $timeout(function () {
                                variable.title.offset({top: (variable.offset.top - getHeight(variable.title))});
                                variable.variable.removeClass('conceal');
                            }, 200);
                            $timeout(function () {
                                variable.value.offset({top: (variable.offset.top - getHeight(variable.title))});
                                variable.value.removeClass('conceal');
                            }, 700);

                        } else if (scope.variable.method === 'set') {
                            if (variable.length > 0) {
                                var index = getIndex(scope);
                                var offset = getOffset(index);
                                var value = getValue(variable);
                                variable.width(getWidth(index));
                                variable.offset({left: (offset.left - getBorder(index))});
                                $timeout(function () {
                                    copy(value, index);
                                    value.addClass('conceal');
                                }, 1000);
                            }
                        }
                    }
                }
            });

            var setup = function () {
                var index = getIndex(scope);
                var variable = getVariable(scope);
                var offset = getOffset(index);
                var title = variable.find('.title');
                title.css('z-index', 100 * scope.variable.index);
                offset.top -= getHeight(index);
                variable.outerWidth(getWidth(index));
                variable.offset({left: (offset.left - getBorder(index))});
                var value = copy(getValue(variable), index);
                return {index: index, variable: variable, offset: offset, value: value, title: title};
            };

            var getPadding = function (element) {
                return ((element.innerWidth() - element.width()) / 2);
            };

            var getBorder = function (element) {
                return (element.outerWidth(true) - element.innerWidth()) / 2;
            };

            var getMargin = function (element) {
                return element.outerWidth(true) - element.outerWidth();
            };

            var getHeight = function (element) {
                return element.outerHeight() - getBorder(element);
            };

            var getWidth = function (element) {
                return element.outerWidth(true) - getBorder(element);
            };

            var copy = function (value, index, z) {
                value.outerWidth(getWidth(index));
                value.css('height', getHeight(index));
                value.offset(getOffset(index));
                value.css('z-index', 100 * scope.variable.index - 2);
                return value;
            };

            var getIndex = function (scope) {
                return $('.index' + scope.variable.index);
            };

            var getValue = function (variable) {
                return variable.find('.value');
            };

            var getVariable = function (scope) {
                var variable = $('#' + scope.variable.name);
                variable.css('z-index', 100 * scope.variable.index);
                return variable;
            };

            var getOffset = function (obj) {
                return obj.offset();
            };
        }
    };
};