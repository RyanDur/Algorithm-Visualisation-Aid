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
		["\\{",                     "return '{';"],
		["\\}",                     "return '}';"],
                ["PI\\b",                   "return 'PI';"],
                ["E\\b",                    "return 'E';"],
                ["<-",                      "return 'ASSIGN';"],
                ["=",                       "return 'EQUALITY';"],
		["≠",                       "return 'NOTEQUAL';"],
		["≤",                       "return 'LTE';"],
		["≥",                       "return 'GTE';"],
                ["(\n|\;)",                 "return 'TERM';"],
                ["return",                  "return 'RET';"],
                ["var",                     "return 'TYPE';"],
		["true\\b",                 "return 'TRUE'"],
		["false\\b",                "return 'FALSE'"],
		["nil\\b",                  "return 'NULL'"],
		["if",                      "return 'IF';"],
		["else",                    "return 'ELSE';"],
		["[a-zA-Z][a-zA-Z0-9_]*",   "return 'VARIABLE';"],
		["$",                       "return 'EOF';"],
                ["\n+",                     "return 'NEWLINE'"]
            ]
        },

        "operators": [
	    ["left", "+", "-"],
            ["left", "*", "/"],
            ["left", "^"],
            ["left", "UMINUS"]
            ["nonassoc", "EQUALITY", "NOTEQUAL", "LTE", "GTE"]
        ],

        "bnf": {
            "expressions" :[
                [ "exp EOF",   "return $1;" ],
		[ "cond EOF",  "return $1;" ],
                [ "stmnt EOF", "return $1;" ]
            ],

            "stmnt" :[
                [ "decl stmnt",    "$$ = $2;" ],
		[ "RET exp TERM",  "$$ = $2;" ],
		[ "RET cond TERM", "$$ = $2;" ],
		[ "if",            "$$ = $1" ]
            ],

	    "if" :[
		[ "IF cond block",            "$$ = yy.Statement.if($2, $3);" ],
		[ "IF cond block ELSE if",    "$$ = yy.Statement.if($2, $3, $5);" ],
		[ "IF cond block ELSE block", "$$ = yy.Statement.if($2, $3, $5);" ]
	    ],

	    "block" :[
		[ "{ stmnt }", "$$ = $2;" ]
	    ],

	    "decl" :[
		[ "TYPE decl", "$$ = $2" ],
		[ "VARIABLE ASSIGN exp TERM", "$$ = yy.Variables.add($1, $3);" ]
	    ],

            "exp" :[
		[ "( exp )",   "$$ = $2;" ],
		[ "NUMBER",    "$$ = Number(yytext);" ],
		[ "VARIABLE",  "$$ = yy.Variables.get($1);" ],
                [ "exp + exp", "$$ = $1 + $3;" ],
		[ "exp - exp", "$$ = $1 - $3;" ],
		[ "exp * exp", "$$ = $1 * $3;" ],
		[ "exp / exp", "$$ = $1 / $3;" ],
		[ "exp ^ exp", "$$ = Math.pow($1, $3);" ],
		[ "- exp",     "$$ = -$2;", {"prec": "UMINUS"} ],
		[ "E",         "$$ = Math.E;" ],
		[ "PI",        "$$ = Math.PI;" ]
            ],

	    "cond" :[
		[ "( cond )",         "$$ = $2;" ],
		[ "exp EQUALITY exp", "$$ = $1 === $3;" ],
		[ "exp NOTEQUAL exp", "$$ = $1 !== $3;" ],
		[ "exp LTE exp",      "$$ = $1 <= $3;" ],
		[ "exp GTE exp",      "$$ = $1 >= $3;" ],
		[ "TRUE",             "$$ = true;"],
		[ "FALSE",            "$$ = false;"]
	    ]
        }
    };





    beforeEach(function() {
        parser = module(grammar, require('./astM'));
    });

    it('should return the correct sum', function() {
        expect(parser.parse("1 + 1")).toBe(2);
    });

    it('should return the correct difference', function() {
        expect(parser.parse("4 - 1")).toBe(3);
    });

    it('should return the correct product', function() {
        expect(parser.parse("4 * 2")).toBe(8);
    });

    it('should return the correct quotient', function() {
        expect(parser.parse("4 / 2")).toBe(2);
    });

    it('should return true for equality', function() {
        expect(parser.parse("3 = 3")).toBe(true);
    });

    it('should be able to return a condition', function() {
	expect(parser.parse("return 3 = 3;")).toBe(true);
    });

    it('should return false for equality', function() {
        expect(parser.parse("3 = 4")).toBe(false);
    });

    it('should return true for proper inequality', function() {
	expect(parser.parse("3 ≠ 4")).toBe(true);
    });

    it('should return false for improper inequality', function() {
	expect(parser.parse("3 ≠ 3")).toBe(false);
    });

    it('should return true for numbers less than or equal', function() {
	expect(parser.parse("3 ≤ 3")).toBe(true);
	expect(parser.parse("2 ≤ 3")).toBe(true);
	expect(parser.parse("1 ≤ 3")).toBe(true);
    });

    it('should return true for numbers greater than or equal', function() {
	expect(parser.parse("3 ≥ 3")).toBe(true);
	expect(parser.parse("4 ≥ 3")).toBe(true);
	expect(parser.parse("5 ≥ 3")).toBe(true);
    });

    it('should return false for numbers not less than or equal', function() {
	expect(parser.parse("2 ≥ 3")).toBe(false);
	expect(parser.parse("1 ≥ 3")).toBe(false);
    });

    it('should return true for numbers not greater than or equal', function() {
	expect(parser.parse("4 ≤ 3")).toBe(false);
	expect(parser.parse("5 ≤ 3")).toBe(false);
    });

    it('should make sure true is true', function() {
	expect(parser.parse("true")).toBe(true);
    });

    it('should make sure false is false', function() {
	expect(parser.parse("false")).toBe(false);
    });

    it('should know the correct syntax for assignment', function() {
        expect(parser.parse("var n <- 3; return n;")).toBe(3);
    });

    it('should allow an expression before assignment', function() {
        expect(parser.parse("n <- 3 + 1; return n;")).toBe(4);
    });

    it('should allow multiline expressions', function() {
        expect(parser.parse("var n <- 3 + 1; var n <- n + 1; return n;")).toBe(5);
    });

    it('should perform the order of operations', function() {
	expect(parser.parse("var x <- 10 - 5 * 2^2 + (36 / 6) - 3; return x;")).toBe(-7);
    });

    it('should be able to perform an if statement', function() {
	expect(parser.parse("if (true) {return 3;}")).toBe(3);
    });

    it('should not perform the experession if condition is false', function() {
	expect(parser.parse("if (false) {return 3;}")).toBe(null);
    });

    it('should be able to perform an if else statement', function() {
	expect(parser.parse("if ( false ) { return 5; } else { return 3; }")).toBe(3);
    });

    it('should be able to continue if else statements', function() {
	expect(parser.parse("if ( false ) { return 5; } else if(true) { return 4; } else { return 3; }")).toBe(4);
	expect(parser.parse("if ( false ) { return 5; } else if(false) { return 4; } else { return 3; }")).toBe(3);
	expect(parser.parse("if ( true ) { return 5; } else if(false) { return 4; } else { return 3; }")).toBe(5);
	expect(parser.parse("if ( true ) { return 5; } else if(true) { return 4; } else { return 3; }")).toBe(5);
    });

    it('should be able to nest if statements', function() {
	expect(parser.parse("if (true) {if (true) {return 3;}}")).toBe(3);
    });
});
