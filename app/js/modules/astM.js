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

var Animations = function() {
    var animations = [];
    if (Animations.prototype._instance) {
	return Animations.prototype._instance;
    }
    Animations.prototype._instance = this;

    this.add = function(frame) {
	animations.push(frame);
    };

    this.get = function() {
	return animations;
    };

    this.clear = function() {
	animations = [];
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

    var f = {
	animation: new Animations().get(),
	print: new Prints().get()
    };
    new Prints().clean();
    return f;
};

exports.Line = function(line, column, val) {
    AstNode.call(this, line, column);

    this.compile = function(node) {
	var animations = new Animations();
	var compiled = val.compile();
	node = node || new PassNode();
	animations.add(this.frame);
	node.animation = animations.get();
	node.print = new Prints().get();
        return node;
    };
};
exports.Line.prototype = Object.create(AstNode.prototype);

exports.Number = function(line, num) {
    AstNode.call(this, line, line);

    this.compile = function() {
	var value = Number(num);
	new Animations().add(this.frame);
        return {
            value: value
        };
    };
};
exports.Number.prototype = Object.create(AstNode.prototype);

exports.Variable = function (line, variable) {
    AstNode.call(this, line, line);

    this.compile = function() {
	new Animations().add(this.frame);
	var node = this.variables.get(variable);
	var value = node ? node.value : '';

        return {
            value: value
        };
    };
};
exports.Variable.prototype = Object.create(AstNode.prototype);

exports.Assign = function(first, last, variable, value) {
    AstNode.call(this, first, last);

    this.compile = function() {
	new Animations().add(this.frame);
	var compiled = value.compile();
	this.variables.add(variable, compiled);
    };
};
exports.Assign.prototype = Object.create(AstNode.prototype);

exports.Output = function(first, last, toPrint, type) {
    AstNode.call(this, first, last);
    this.compile = function() {
	new Animations().add(this.frame);
	var prints = new Prints();
        var compiled = toPrint.compile();
        if (type === 'print') {this.print = compiled.value;}
        else if (type === 'println') {this.print = compiled.value + '\n';}
	prints.add(this.print);
    };
};
exports.Output.prototype = Object.create(AstNode.prototype);

exports.If = function(line, column, cond, stmnt1, stmnt2) {
    AstNode.call(this, line, column);
    this.compile = function(node) {
	var animations = new Animations();
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
            node.animation.concat(compiled.animation);
            node.value = compiled.value;
	}
        animations.add(this.frame);
	node.animation.concat(animations.get());
	node.print = new Prints().get();

        return  node;
    };
};
exports.If.prototype = Object.create(AstNode.prototype);

exports.Arr = function(line, list) {
    AstNode.call(this, line, line);
    this.compile = function() {
	var animations = new Animations();
        var arr = list.replace(/\[(.*?)\]/g,"$1").split(',').map(function(item) {
            return parseInt(item, 10);
        });
        var value = arr;
        var highlight = this.highlight;
        animations.add(function($scope, editor) {
            $scope.data = arr;
            $scope.structure = 'array';
            highlight(editor);
        });

        return {
            value: value
        };
    };
};
exports.Arr.prototype = Object.create(AstNode.prototype);

exports.Add = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);

    this.compile = function() {
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value + stmnt2.value;

        return {
            value: this._value
        };
    };
};
exports.Add.prototype = Object.create(AstNode.prototype);

exports.Subtract = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value - stmnt2.value;

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
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value - stmnt2.value;

        return {
            value: this._value
        };
    };
};
exports.Subtract.prototype = Object.create(AstNode.prototype);

exports.Multiply = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value * stmnt2.value;

        return {
            value: this._value
        };
    };
};
exports.Multiply.prototype = Object.create(AstNode.prototype);


exports.Divide = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value / stmnt2.value;
        this.print = this._value;

        return {
            value: this._value
        };
    };
};
exports.Divide.prototype = Object.create(AstNode.prototype);

exports.Pow = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = Math.pow(stmnt1.value, stmnt2.value);

        return {
            value: this._value
        };
    };
};
exports.Pow.prototype = Object.create(AstNode.prototype);

exports.Equal = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value === stmnt2.value;

        return {
            value: this._value
        };
    };
};
exports.Equal.prototype = Object.create(AstNode.prototype);

exports.Inequal = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value !== stmnt2.value;

        return {
            value: this._value
        };
    };
};
exports.Inequal.prototype = Object.create(AstNode.prototype);

exports.LTE = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value <= stmnt2.value;

        return {
            value: this._value
        };
    };
};
exports.LTE.prototype = Object.create(AstNode.prototype);


exports.GTE = function(first, last, stmnt1, stmnt2) {
    AstNode.call(this, first, last);
    this.compile = function() {
	new Animations().add(this.frame);
        stmnt1 = stmnt1.compile();
        stmnt2 = stmnt2.compile();
        this._value = stmnt1.value >= stmnt2.value;

        return {
            value: this._value
        };
    };
};
exports.GTE.prototype = Object.create(AstNode.prototype);

exports.Boolean = function(line, bool) {
    AstNode.call(this, line, line);
    this.compile = function() {
	new Animations().add(this.frame);
        this._value = bool;

        return {
            value: this._value
        };
    };
};
exports.Boolean.prototype = Object.create(AstNode.prototype);
