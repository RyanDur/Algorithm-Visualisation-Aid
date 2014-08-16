'use strict';
var Parser = require("jison").Parser;

module.exports = function(grammar, ast) {
    var parser = new Parser(grammar);
    parser.yy = ast;
    return {
        parse: function parse(input) {
	    var output = document.getElementById('output');
            output.innerHTML = parser.parse(input);
        }
    };
};
