'use strict';

var AstNode = function (first, last) {
    this.highlight = function(editor) {
        editor.removeHighlight();
        editor.setHighlight(first.first_line,
                            last.last_line,
                            first.first_column,
                            last.last_column);
    };
    this.variables = new Variables();
    this.animation = [];
    var highlight = this.highlight;
    this.frame = function(scope, editor) {
        highlight(editor);
    };
};

var Variables = function() {
    var variables = {};

    if(Variables.prototype._instance) {
        return Variables.prototype._instance;
    }
    Variables.prototype._instance = this;

    this.add = function(key, value) {
        variables[key] = value;
    };
    this.get = function(key) {
        return variables[key];
    };
};


exports.Line = function(line, column, value) {
    AstNode.call(this, line, column);
    this.compile = function() {
        var compiled = value.compile();
        this.animation = compiled.animation;
        this.print = compiled.print;
        this.animation.push(this.frame);
        this._value = compiled.value;

        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Line.prototype = Object.create(AstNode.prototype);

exports.Number = function(line, value) {
    AstNode.call(this, line, line);
    this.compile = function() {
        this._value = Number(value);
        this.print = this._value;
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Number.prototype = Object.create(AstNode.prototype);

exports.Variable = function (line, variable) {
    AstNode.call(this, line, line);
    this._name = variable;
    this.compile = function() {
        return this.variables.get(this._name);
    };
};
exports.Variable.prototype = Object.create(AstNode.prototype);

exports.Assign = function(first, last, variable, value) {
    exports.Variable.call(this, first, variable);
    this.variables.add(variable, value.compile());
    this.compile = function() {
        return this;
    };
};
exports.Assign.prototype = Object.create(exports.Variable.prototype);

exports.Output = function(first, last, toPrint, type) {
    AstNode.call(this, first, last);
    this.compile = function() {
        var compiled = toPrint.compile();
        if (type === 'print') {this.print = compiled.print;}
        else if (type === 'println') {this.print = compiled.print + '\n';}
        this.animation = compiled.animation;
        this.animation.push(this.frame);
        return  {
            animation: this.animation,
            print: this.print
        };
    };
};
exports.Output.prototype = Object.create(AstNode.prototype);

exports.If = function(line, column, cond, stmnt1, stmnt2) {
    AstNode.call(this, line, column);
    this.compile = function() {
        var compiled;
        if (cond.compile().value) {
            compiled = stmnt1.compile();
        } else {
            if(stmnt2) {
                compiled = stmnt2.compile();
            }
        }
	if (compiled) {
	    this.print = compiled.print;
            this.animation = compiled.animation;
	    this._value = compiled.value;
            this.animation.push(this.frame);
	}
        return  {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.If.prototype = Object.create(AstNode.prototype);

exports.Arr = function(line, list) {
    AstNode.call(this, line, line);
    var arr = list.replace(/\[(.*?)\]/g,"$1").split(',').map(function(item) {
        return parseInt(item, 10);
    });
    this._value = arr;
    var highlight = this.highlight;
    this.compile = function() {
        this.print = arr;
        this.animation.push(function($scope, editor) {
            $scope.data = arr;
            $scope.structure = 'array';
            highlight(editor);
        });
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Arr.prototype = Object.create(AstNode.prototype);

exports.Add = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value + stmnt2.value;
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Add.prototype = Object.create(AstNode.prototype);

exports.Subtract = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value - stmnt2.value;
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Add.prototype = Object.create(AstNode.prototype);

exports.Subtract = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value - stmnt2.value;
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Subtract.prototype = Object.create(AstNode.prototype);

exports.Multiply = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value * stmnt2.value;
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Multiply.prototype = Object.create(AstNode.prototype);


exports.Divide = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value / stmnt2.value;
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Divide.prototype = Object.create(AstNode.prototype);

exports.Pow = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = Math.pow(stmnt1.value, stmnt2.value);
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Pow.prototype = Object.create(AstNode.prototype);

exports.Equal = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value === stmnt2.value;
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Equal.prototype = Object.create(AstNode.prototype);

exports.Inequal = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value !== stmnt2.value;
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Inequal.prototype = Object.create(AstNode.prototype);

exports.LTE = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value <= stmnt2.value;
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.LTE.prototype = Object.create(AstNode.prototype);


exports.GTE = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value >= stmnt2.value;
        this.print = this._value;
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.GTE.prototype = Object.create(AstNode.prototype);

exports.Boolean = function(line, bool) {
    AstNode.call(this, line, line);
    this.compile = function() {
        this._value = bool;
        this.print = this._value;
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            print: this.print,
            value: this._value
        };
    };
};
exports.Boolean.prototype = Object.create(AstNode.prototype);

exports.Statement = function ifStatement() {
    return {
        if: function(condition, fisrt, second) {
            second = second === undefined ? null : second;
            return condition === true ? fisrt : second;
        }
    };
}();
