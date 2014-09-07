'use strict';
var Parser = require("jison").Parser;

module.exports = function (grammar, ast) {
    var parser = new Parser(grammar);
    parser.yy = ast;
    return {
        parse: function parse(input) {
            return parser.parse(input);
        }
    };
};
