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
            var variable;
            scope.$watch("clear", function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    $timeout(function() {
                        elem.find('.variable')
                            .addClass('conceal')
                            .offset({top: 0});
                    }, 100);
                    $timeout(function() {
                        scope.variables = {};
                        variable = [];
                    }, 1000);
                }
            });
            scope.$watch('variable', function (newVal, oldVal) {
                var index;
                var offset;
                if (newVal !== oldVal) {
                    variable = $('#' + scope.variable.name);
                    if (scope.variable && variable.length === 0) {
                        scope.variables[scope.variable.name] = scope.variable.value;
                        $timeout(function () {
                            index = $('.index' + scope.variable.index);
                            variable = $('#' + scope.variable.name);
                            variable.css('z-index',100 + scope.variable.index);
                            offset = index.offset();
                            offset.top -= index.outerHeight();
                            variable.width(index.outerWidth() - 2);
                            variable.offset({left: offset.left});
                        }, 10);
                        $timeout(function () {
                            variable.offset({top: offset.top});
                            variable.removeClass('conceal');
                            scope.hide = false;
                        }, 20);
                        $timeout(function () {
                            variable.find('.value').removeClass('conceal');
                        }, 950);
                    } else if(scope.variable.method === 'get' && variable.length > 0) {
                        index = $('.index' + scope.variable.index);
                        offset = index.offset();
                        variable.width(index.outerWidth() - 2);
                        variable.offset({left: offset.left});
                        variable.find('.value').addClass('conceal');
                        $timeout(function() {
                            scope.variables[scope.variable.name] = scope.variable.value;
                            variable.find('.value').removeClass('conceal');
                        },500);
                    } else if(scope.variable.method === 'set' && variable.length > 0) {
                        index = $('.index' + scope.variable.index);
                        offset = index.offset();
                        variable.width(index.outerWidth() - 2);
                        variable.offset({left: offset.left});
                    }
                }
            });
        }
    };
};