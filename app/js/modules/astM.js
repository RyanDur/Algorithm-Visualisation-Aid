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

var Prints = function() {
    var prints = '';
    if(Prints.prototype._instance) {
        return Prints.prototype._instance;
    }
    Prints.prototype._instance = this;

    this.add = function(print) {
        prints += print;
    };

    this.get = function() {
        return prints;
    };

    this.clean = function() {
        prints = '';
    };
};

var PassNode = function() {
    this.animation = [];
    this.print = '';
    this.value = null;
};

exports.compile = function(node) {
    var compiled;
    for (var i = 0; i < node.length; i++) {
	compiled = node[i].compile(compiled);
    }

    new Prints().clean();
    return compiled;
};

exports.Line = function(line, column, val) {
    AstNode.call(this, line, column);

    this.compile = function(node) {
	node = node || new PassNode();
	var compiled = val.compile();
	node.value = compiled.value;
	node.animation = compiled.animation;
	node.animation.push(this.frame);
	node.print = new Prints().get();
        return node;
    };
};
exports.Line.prototype = Object.create(AstNode.prototype);

exports.Number = function(line, num) {
    AstNode.call(this, line, line);

    this.compile = function() {
	var value = Number(num);
	this.animation.push(this.frame);

        return {
            animation: this.animation,
            value: value
        };
    };
};
exports.Number.prototype = Object.create(AstNode.prototype);

exports.Variable = function (line, variable) {
    AstNode.call(this, line, line);

    this.compile = function() {
	var node = this.variables.get(variable);
	var animation = node ? node.animation : [];
	var value = node ? node.value : '';
	animation.push(this.frame);

        return {
            animation: animation,
            value: value
        };
    };
};
exports.Variable.prototype = Object.create(AstNode.prototype);

exports.Assign = function(first, last, variable, value) {
    AstNode.call(this, first, last);

    this.compile = function() {
	var compiled = value.compile();
	var animation = compiled.animation;
	animation.push(this.frame);
	compiled.animation = this.animation;
	this.variables.add(variable, compiled);

        return {
            animation: animation
        };
    };
};
exports.Assign.prototype = Object.create(AstNode.prototype);

exports.Output = function(first, last, toPrint, type) {
    AstNode.call(this, first, last);
    this.compile = function() {
	var prints = new Prints();
        var compiled = toPrint.compile();
        if (type === 'print') {this.print = compiled.value;}
        else if (type === 'println') {this.print = compiled.value + '\n';}
        this.animation = compiled.animation;
        this.animation.push(this.frame);

	prints.add(this.print);
        return  {
            animation: this.animation
        };
    };
};
exports.Output.prototype = Object.create(AstNode.prototype);

exports.If = function(line, column, cond, stmnt1, stmnt2) {
    AstNode.call(this, line, column);
    this.compile = function(node) {
	node = node || new PassNode();
	var compiled;
	if (cond.compile().value) {
            compiled = stmnt1[0].compile();
	} else {
            if(stmnt2) {
		compiled = stmnt2[0].compile();
            }
	}
	if (compiled) {
            node.animation = compiled.animation;
            node.value = compiled.value;
	}
        node.animation.push(this.frame);
	node.print = new Prints().get();

        return  node;
    };
};
exports.If.prototype = Object.create(AstNode.prototype);

exports.Arr = function(line, list) {
    AstNode.call(this, line, line);
    this.compile = function() {
        var arr = list.replace(/\[(.*?)\]/g,"$1").split(',').map(function(item) {
            return parseInt(item, 10);
        });
        var value = arr;
        var highlight = this.highlight;
        this.animation.push(function($scope, editor) {
            $scope.data = arr;
            $scope.structure = 'array';
            highlight(editor);
        });

        return {
            animation: this.animation,
            value: value
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
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);

        return {
            animation: this.animation,
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
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
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
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
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
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
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
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
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
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
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
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
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
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
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
        this.animation = stmnt1.animation.concat(stmnt2.animation);
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            value: this._value
        };
    };
};
exports.GTE.prototype = Object.create(AstNode.prototype);

exports.Boolean = function(line, bool) {
    AstNode.call(this, line, line);
    this.compile = function() {
        this._value = bool;
        this.animation.push(this.frame);
        return {
            animation: this.animation,
            value: this._value
        };
    };
};
exports.Boolean.prototype = Object.create(AstNode.prototype);
