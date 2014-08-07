'use strict';
var Parser = require("jison").Parser;

module.exports = function(grammar) {
    var parser = new Parser(grammar);
    return {
        parse: function parse(input) {
            return parser.parse(input);
        }
    };
};
