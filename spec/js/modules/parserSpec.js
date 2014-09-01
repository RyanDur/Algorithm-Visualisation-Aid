var module = require('../../../app/js/modules/parser');
var grammar = require('../../../app/js/grammars/grammar');
var ast = require('../../../app/js/modules/astM');

describe('parser', function() {
    var parser;
    var parse = function(str) {
	return parser.parse("print(" + str + ");").print;
    };

    beforeEach(function() {
        parser = module(grammar, ast);
    });

    it('should return the correct sum', function() {
	expect(parse("1 + 1")).toBe('2');
    });

    it('should return the correct difference', function() {
	expect(parse("4 - 1")).toBe('3');
    });

    it('should return the correct product', function() {
        expect(parse("4 * 2")).toBe('8');
    });

    it('should return the correct quotient', function() {
        expect(parse("4 / 2")).toBe('2');
    });

    it('should return true for equality', function() {
        expect(parse("3 = 3")).toBe('true');
    });

    it('should return false for equality', function() {
	expect(parse("3 = 4")).toBe('false');
    });

    it('should return true for proper inequality', function() {
	expect(parse("3 ≠ 4")).toBe('true');
    });

    it('should return false for improper inequality', function() {
	expect(parse("3 ≠ 3")).toBe('false');
    });

    it('should return true for numbers less than or equal', function() {
	expect(parse("3 ≤ 3")).toBe('true');
	expect(parse("2 ≤ 3")).toBe('true');
	expect(parse("1 ≤ 3")).toBe('true');
    });

    it('should return true for numbers greater than or equal', function() {
	expect(parse("3 ≥ 3")).toBe('true');
	expect(parse("4 ≥ 3")).toBe('true');
	expect(parse("5 ≥ 3")).toBe('true');
    });

    it('should return false for numbers not less than or equal', function() {
	expect(parse("2 ≥ 3")).toBe('false');
	expect(parse("1 ≥ 3")).toBe('false');
    });

    it('should return true for numbers not greater than or equal', function() {
	expect(parse("4 ≤ 3")).toBe('false');
	expect(parse("5 ≤ 3")).toBe('false');
    });

    it('should make sure true is true', function() {
	expect(parse("true")).toBe('true');
    });

    it('should make sure false is false', function() {
	expect(parse("false")).toBe('false');
    });

    it('should know the correct syntax for assignment', function() {
	expect(parser.parse("var n <- 3; print(n);").print).toBe('3');
    });

    it('should allow an expression before assignment', function() {
	expect(parser.parse("n <- 3 + 1; print(n);").print).toBe('4');
    });

    it('should allow multiline expressions', function() {
	expect(parser.parse("var n <- 3 + 1; var n <- n + 1; print(n);").print).toBe('5');
    });

    it('should perform the order of operations', function() {
	expect(parser.parse("var x <- 10 - 5 * 2^2 + (36 / 6) - 3; print(x);").print).toBe('-7');
    });

    it('should be able to perform an if statement', function() {
	expect(parser.parse("if (true) {print(3);}").print).toBe('3');
    });

    it('should not perform the experession if condition is false', function() {
	expect(parser.parse("if (false) {print(3);}").print).toBe('');
    });

    it('should be able to perform an if else statement', function() {
	expect(parser.parse("if ( false ) { print(5); } else { print(3); }").print).toBe('3');
    });

    it('should be able to continue if else statements', function() {
	expect(parser.parse("if ( false ) { print(5); } else if(true) { print(4); } else { print(3); }").print).toBe('4');
	expect(parser.parse("if ( false ) { print(5); } else if(false) { print(4); } else { print(3); }").print).toBe('3');
	expect(parser.parse("if ( true ) { print(5); } else if(false) { print(4); } else { print(3); }").print).toBe('5');
	expect(parser.parse("if ( true ) { print(5); } else if(true) { print(4); } else { print(3); }").print).toBe('5');
    });

    it('should be able to nest if statements', function() {
	expect(parser.parse("if (true) {if (true) {print(3);}}").print).toBe('3');
    });

    it('should be able to create an array', function() {
	expect(parser.parse("var arr <- [1,2,3,4,5]; print(arr);").print).toEqual('1,2,3,4,5');
    });

    it('should be able to print multiple times', function() {
	expect(parser.parse("print(3); print(4);").print).toBe('34');
    });

    it('should be able to print and new line', function() {
	expect(parser.parse("println(3);").print).toBe('3\n');
    });

    it('should bea able to perform multiple statments within a block', function() {
	var program = "var a <- 3; if(true) {a <- a + 3; a <- a - 2;} print(a);";
	expect(parser.parse(program).print).toBe('4');
    });

    it('should not have variable declared within a block be visible outside of it', function() {
	var program = "var a <- 3; if(true) {var b <- 3; b <- a + b; b <- a - 2;} print(b);";
	expect(parser.parse(program).print).toBe('');
    });

    it('should be able to assign a variable multiple times', function() {
	var program = "var a <- 1; a <- a + 1; a <- a + 1; a <- a + 1; print(a);";
	expect(parser.parse(program).print).toBe('4');
    });

    it('should be able to perform a while loop', function() {
	var program = "var a <- 1; while(a < 10) {a <- a + 1;} print(a);";
	expect(parser.parse(program).print).toBe('10');
    });

    it('should be able to perform a do while loop', function() {
	var program = "var a <- 1; do {a <- a + 1;} while(a < 10); print(a);";
	expect(parser.parse(program).print).toBe('10');
    });

    it('it should be able to perform a for loop', function() {
	var program = "var a <- 0; for(var i <- 0; i < 12; i++) {a <- a + 1;} print(a);";
	expect(parser.parse(program).print).toBe('12');
    });

    it('should scope variables to within the for loop', function() {
	var program = "var a <- 2; for(var i <- 0; i < 13; i++) {a <- a + 1;} print(i);print(a);";
	expect(parser.parse(program).print).toBe('15');
    });

    it('should be able to perform functions on objects already defined by javascript', function() {
	var program = "var arr <- [1]; arr.push(1); print(arr);";
	expect(parser.parse(program).print).toBe('1,1');
    });

    it('should be able to pass a variable to the inner scope of a loop', function() {
	var program = "for(var i <- 0; i < 5; i++) {print(i);}";
	expect(parser.parse(program).print).toBe('01234');
    });

    it('should be able to push onto an array from within an array', function() {
	var program = "var arr <- [1]; for(var i <- 0; i < 5; i++) {arr.push(i);} print(arr);";
	expect(parser.parse(program).print).toBe('1,0,1,2,3,4');
    });

    it('it should be able to create an empty array', function() {
	expect(parser.parse("var arr <- []; print(arr);").print).toBe('');
    });
});
