'use strict';

var Output = require('../modules/nodes/func/Output');
var FunctionCall = require('../modules/nodes/func/FunctionCall');
var ArrayAccess = require('../modules/nodes/func/ArrayAccess');

module.exports = function () {
    return {
        Output: function (first, last, toPrint, type) {
            return new Output(first, last, toPrint, type);
        },
        FunctionCall: function (first, last, obj, method, params) {
            return new FunctionCall(first, last, obj, method, params);
        },
        ArrayAccess: function (first, last, variable, arr) {
            return new ArrayAccess(first, last, variable, arr);
        }
    };
}();
