'use strict';
var Break = require('../modules/nodes/reserved/Break');
var Return = require('../modules/nodes/reserved/Return');

module.exports = function () {
    return {
        Break: function(line) {
            return new Break(line);
        },
        Return: function(first,last, returnable) {
            return new Return(first, last, returnable);
        }
    };
}();
