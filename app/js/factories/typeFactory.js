'use strict';

var Arr = require('../modules/nodes/type/Arr');
var Bool = require('../modules/nodes/type/Boolean');
var Num = require('../modules/nodes/type/Number');

module.exports = function () {
    return {
        Arr: function (line, list) {
            return new Arr(line, list);
        },
        Boolean: function (line, bool) {
            return new Bool(line, bool);
        },
        Number: function (line, num) {
            return new Num(line, num);
        }
    };
}();
