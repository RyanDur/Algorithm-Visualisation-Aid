var module = require('../../../app/js/modules/parser');
var grammar = require('../../../app/js/grammars/grammar');
var ast = require('../../../app/js/modules/astM');

describe('parser', function() {
    var parser;

    beforeEach(function() {
        parser = module(grammar, ast);
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

    it('should be able to create an array', function() {
	expect(parser.parse("var a <- [1,2,3,4,5]; return a;")).toEqual([1,2,3,4,5]);
    });
});
