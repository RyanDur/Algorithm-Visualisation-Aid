'use strict';
var variables = {};

var AstNode = function (line, column, animation) {
    this._line = line;
    this._column = column;

    this.animation = animation || [];
};

exports.Line = function(line, column, value) {
    AstNode.call(this, line, column, value.animation);
    this._value = value._value;
};
exports.Line.prototype = Object.create(AstNode.prototype);

exports.Variable = function (line, column, value) {
    AstNode.call(this, line, column);
    this._name = value;
    variables[this._name] = variables[this._name];
};
exports.Variable.prototype = Object.create(AstNode.prototype);

exports.Assign = function(line, column, variable, value) {
    exports.Variable.call(this, line, column, variable.name);
    this._value = value._value;
    this.animation = value.animation;
    variables[variable._name] = this;
};
exports.Assign.prototype = Object.create(exports.Variable.prototype);

exports.Number = function (line, column, value) {
    AstNode.call(this, line, column);
    this._value = Number(value);
};
exports.Number.prototype = Object.create(AstNode.prototype);

exports.Boolean = function(line, column, value) {
    AstNode.call(this, line, column);
    this._value = value;
};
exports.Boolean.prototype = Object.create(AstNode.prototype);


exports.Expression = function (line, column, operand1, operand2, operator) {
    if (operand1._name !== undefined && isNaN(operand1._value)) {
        operand1 = variables[operand1._name];
    }
    if (operand2._name !== undefined && isNaN(operand2._value)) {
        operand2 = variables[operand2._name];
    }

    AstNode.call(this, line, column);

    if (operator === "+") {
        this._value =  operand1._value + operand2._value;
        this.result = new exports.Number(line, column, this._value);
    } else if (operator === "-") {
        this._value =  operand1._value - operand2._value;
        this.result = new exports.Number(line, column, this._value);
    } else if (operator === "*") {
        this._value =  operand1._value * operand2._value;
        this.result = new exports.Number(line, column, this._value);
    } else if (operator === '/') {
        this._value =  operand1._value / operand2._value;
        this.result = new exports.Number(line, column, this._value);
    } else if(operator === '^') {
        this._value =  Math.pow(operand1._value, operand2._value);
        this.result = new exports.Number(line, column, this._value);
    } else if (operator === '=') {
        this._value = operand1._value === operand2._value;
        this.result = new exports.Boolean(line, column, this._value);
    } else if (operator === '≠') {
        this._value = operand1._value !== operand2._value;
        this.result = new exports.Boolean(line, column, this._value);
    } else if (operator === '≤') {
        this._value = operand1._value <= operand2._value;
        this.result = new exports.Boolean(line, column, this._value);
    } else if (operator === '≥') {
        this._value = operand1._value >= operand2._value;
        this.result = new exports.Boolean(line, column, this._value);
    } else if (operator === 'true') {
        this._value = true;
        this.result = new exports.Boolean(line, column, this._value);
    } else if (operator === 'false') {
        this._value = false;
        this.result = new exports.Boolean(line, column, this._value);
    }
};
exports.Expression.prototype = Object.create(AstNode.prototype);

exports.Output = function(line, column, toPrint, type) {
    var printable;

    if (toPrint._name !== undefined) {
        printable = variables[toPrint._name];
    } else {
        printable = toPrint;
    }

    AstNode.call(this, line, column, printable.animation);
    var last = printable.animation[printable.animation.length-1];

    var f = function($scope, editor) {
	editor.highlightLine(line, column);
    };

    this.animation.push(f);

    if (type === 'print') {this.print = printable._value;}
    else if (type === 'println') {this.print = printable._value + '\n';}
};
exports.Output.prototype = Object.create(AstNode.prototype);

exports.Operator = function (line, column, operatorText) {
    AstNode.call(this, line, column);
    this.symbol = operatorText;
};
exports.Operator.prototype = Object.create(AstNode.prototype);

exports.If = function(line, column, cond, stmnt1, stmnt2) {
    AstNode.call(this, line, column);
    if (cond._value) {
        this._value = stmnt1;
    } else {
        this._value = stmnt2;
    }
};
exports.If.prototype = Object.create(AstNode.prototype);

exports.Arr = function(line, column, list) {
    AstNode.call(this, line, column);
    var arr = list.replace(/\[(.*?)\]/g,"$1").split(',').map(function(item) {
        return parseInt(item, 10);
    });
    this._value = arr;

    var f = function($scope, editor) {
        $scope.data = arr;
        $scope.structure = 'array';
        editor.highlightLine(line, column);
    };

    this.animation.push(f);
};
exports.Arr.prototype = Object.create(AstNode.prototype);


exports.Statement = function ifStatement() {
    return {
        if: function(condition, fisrt, second) {
            second = second === undefined ? null : second;
            return condition === true ? fisrt : second;
        }
    };
}();
