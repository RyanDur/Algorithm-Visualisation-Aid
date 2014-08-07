var module = require('../../../app/js/modules/parser');

describe('parser', function() {
    var parser;
    var grammar = {
	"lex": {
            "rules": [
		["\\s+", "/* skip whitespace */"],
		["[a-f0-9]+", "return 'HEX';"]
            ]
	},

	"bnf": {
            "hex_strings" :[ "hex_strings HEX",
                             "HEX" ]
	}
    };

    beforeEach(function() {
        parser = module(grammar);
    });

    it('should return true for if correct', function() {
        expect(parser.parse("adfe34bc e82a")).toBe(true);
    });

    it('should throw an error if incorrect input', function() {
	expect(parser.parse).toThrow();
    });
});
