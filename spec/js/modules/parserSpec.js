var module = require('../../../app/js/modules/parser');
var grammar = require('../../../app/js/grammars/grammar');
var ast = require('../../../app/js/modules/astM');

describe('parser', function() {
    var parser;

    beforeEach(function() {
	loadFixtures("output.html");
        parser = module(grammar, ast);
    });

    it('should return the correct sum', function() {
	parser.parse("1 + 1");
	expect($('#output').text()).toBe('2');
    });

    it('should return the correct difference', function() {
        parser.parse("4 - 1");
	expect($('#output').text()).toBe('3');
    });

    it('should return the correct product', function() {
	parser.parse("4 * 2");
        expect($('#output').text()).toBe('8');
    });

    it('should return the correct quotient', function() {
	parser.parse("4 / 2");
        expect($('#output').text()).toBe('2');
    });

    it('should return true for equality', function() {
	parser.parse("3 = 3");
        expect($('#output').text()).toBe('true');
    });

    it('should be able to return a condition', function() {
	parser.parse("return 3 = 3;");
        expect($('#output').text()).toBe('true');
    });

    it('should return false for equality', function() {
	parser.parse("3 = 4");
	expect($('#output').text()).toBe('false');
    });

    it('should return true for proper inequality', function() {
	parser.parse("3 ≠ 4");
	expect($('#output').text()).toBe('true');
    });

    it('should return false for improper inequality', function() {
	parser.parse("3 ≠ 3");
	expect($('#output').text()).toBe('false');
    });

    it('should return true for numbers less than or equal', function() {
	parser.parse("3 ≤ 3");
	expect($('#output').text()).toBe('true');
	parser.parse("2 ≤ 3");
	expect($('#output').text()).toBe('true');
	parser.parse("1 ≤ 3");
	expect($('#output').text()).toBe('true');
    });

    it('should return true for numbers greater than or equal', function() {
	parser.parse("3 ≥ 3");
	expect($('#output').text()).toBe('true');
	parser.parse("4 ≥ 3");
	expect($('#output').text()).toBe('true');
	parser.parse("5 ≥ 3");
	expect($('#output').text()).toBe('true');
    });

    it('should return false for numbers not less than or equal', function() {
	parser.parse("2 ≥ 3");
	expect($('#output').text()).toBe('false');
	parser.parse("1 ≥ 3");
	expect($('#output').text()).toBe('false');
    });

    it('should return true for numbers not greater than or equal', function() {
	parser.parse("4 ≤ 3");
	expect($('#output').text()).toBe('false');
	parser.parse("5 ≤ 3");
	expect($('#output').text()).toBe('false');
    });

    it('should make sure true is true', function() {
	parser.parse("true");
	expect($('#output').text()).toBe('true');
    });

    it('should make sure false is false', function() {
	parser.parse("false");
	expect($('#output').text()).toBe('false');
    });

    it('should know the correct syntax for assignment', function() {
	parser.parse("var n <- 3; return n;");
	expect($('#output').text()).toBe('3');
    });

    it('should allow an expression before assignment', function() {
	parser.parse("n <- 3 + 1; return n;");
	expect($('#output').text()).toBe('4');
    });

    it('should allow multiline expressions', function() {
	parser.parse("var n <- 3 + 1; var n <- n + 1; return n;");
	expect($('#output').text()).toBe('5');
    });

    it('should perform the order of operations', function() {
	parser.parse("var x <- 10 - 5 * 2^2 + (36 / 6) - 3; return x;");
	expect($('#output').text()).toBe('-7');
    });

    it('should be able to perform an if statement', function() {
	parser.parse("if (true) {return 3;}");
	expect($('#output').text()).toBe('3');
    });

    it('should not perform the experession if condition is false', function() {
	parser.parse("if (false) {return 3;}");
	expect($('#output').text()).toBe('');
    });

    it('should be able to perform an if else statement', function() {
	parser.parse("if ( false ) { return 5; } else { return 3; }");
	expect($('#output').text()).toBe('3');
    });

    it('should be able to continue if else statements', function() {
	parser.parse("if ( false ) { return 5; } else if(true) { return 4; } else { return 3; }");
	expect($('#output').text()).toBe('4');
	parser.parse("if ( false ) { return 5; } else if(false) { return 4; } else { return 3; }");
	expect($('#output').text()).toBe('3');
	parser.parse("if ( true ) { return 5; } else if(false) { return 4; } else { return 3; }");
	expect($('#output').text()).toBe('5');
	parser.parse("if ( true ) { return 5; } else if(true) { return 4; } else { return 3; }");
	expect($('#output').text()).toBe('5');
    });

    it('should be able to nest if statements', function() {
	parser.parse("if (true) {if (true) {return 3;}}");
	expect($('#output').text()).toBe('3');
    });

    it('should be able to create an array', function() {
	parser.parse("var a <- [1,2,3,4,5]; return a;");
	expect($('#output').text()).toBe('1,2,3,4,5');
    });
});
