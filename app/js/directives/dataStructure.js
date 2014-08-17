'use strict';

module.exports = function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            data: "=",
            structure: "@"
        },
        templateUrl: "templates/data_array.html"
    };
};
