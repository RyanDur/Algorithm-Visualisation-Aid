var module = require('../../../app/js/modules/parser');

describe('parser', function() {
    var parser;
    var grammar = {
        "lex": {
            "rules": [
                ["\\s+",                    "/* skip whitespace */"],
                ["//.*",                    "/* ignore comments */"],
                ["[0-9]+(?:\\.[0-9]+)?\\b", "return 'NUMBER';"],
                ["\\*",                     "return '*';"],
                ["\\/",                     "return '/';"],
                ["-",                       "return '-';"],
                ["\\+",                     "return '+';"],
                ["\\^",                     "return '^';"],
                ["\\(",                     "return '(';"],
                ["\\)",                     "return ')';"],
                ["PI\\b",                   "return 'PI';"],
                ["E\\b",                    "return 'E';"],
                ["<-",                      "return 'ASSIGN';"],
                ["=",                       "return 'EQUALITY';"],
                ["(\n|\;)",                 "return 'TERM';"],
                ["$",                       "return 'EOF';"],
                ["return",                  "return 'RET';"],
                ["var",                     "return 'TYPE';"],
		["[a-zA-Z][a-zA-Z0-9_]*",  "return 'VARIABLE';"],
                ["\n+",                     "return 'NEWLINE'"]
            ]
        },

        "operators": [
            ["left", "+", "-"],
            ["left", "*", "/"],
            ["left", "^"],
            ["left", "UMINUS"],
            ["nonassoc", "EQUALITY"]
        ],

        "bnf": {
            "expressions" :[
                [ "exp EOF",     "return $1;" ],
                [ "stmnt EOF",   "return $1;" ]
            ],

            "stmnt" :[
                [ "vars stmnt",   "$$ = $1;" ],
                [ "TYPE stmnt",   "$$ = $2;" ],
		[ "RET exp TERM", "return $2;" ]
            ],

	    "vars" :[
		[ "VARIABLE ASSIGN exp TERM", "$$ = yy.Variables.add($1, $3);" ]
	    ],

            "exp" :[
		[ "NUMBER",           "$$ = Number(yytext);" ],
		[ "VARIABLE",         "$$ = yy.Variables.get($1);"],
                [ "exp + exp",        "$$ = $1 + $3;" ],
                [ "exp EQUALITY exp", "$$ = $1 === $3;" ]
            ]
        }
    };





    beforeEach(function() {
        parser = module(grammar, require('./astM'));
    });

    it('should return true for if correct', function() {
        expect(parser.parse("1 + 1")).toBe(2);
    });

    it('should throw an error if incorrect input', function() {
       // expect(function() {parser.parse("a + 1");}).toThrow();
    });

    it('should return true for equality', function() {
        expect(parser.parse("3 = 3")).toBe(true);
    });

    it('should return false for equality', function() {
        expect(parser.parse("3 = 4")).toBe(false);
    });

    it('should know the correct syntax for assignment', function() {
        expect(parser.parse("var n <- 3; return n;")).toBe(3);
    });

    it('should allow an expression befpre assignment', function() {
        expect(parser.parse("n <- 3 + 1; return n;")).toBe(4);
    });

    it('should allow multiline expressions', function() {
        expect(parser.parse(" var n <- 3 + 1; var n <- n + 1; return n;")).toBe(5);
    });
});
