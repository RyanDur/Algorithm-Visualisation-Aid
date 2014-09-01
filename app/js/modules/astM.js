'use strict';

var AstNode = require('./nodes/AstNode');
var Variables = require('./nodes/Variables');
var Prints = require('./nodes/Prints');
var Animations = require('./nodes/Animations');
var PassNode = require('./nodes/PassNode');

var compile = function(stmnts, node) {
    var passNode = node;
    for (var i = 0; i < stmnts.length; i++) {
        passNode = stmnts[i].compile(passNode);
    }
    return passNode;
};



exports.compile = function(node) {
    compile(node);
    var result = {
        animation: new Animations().get(),
        print: new Prints().get()
    };
    new Prints().clear();
    new Animations().clear();
    return result;
};

exports.Line = function(line, column, val) {
    AstNode.call(this, line, column);
    this.compile = function(node) {
        new Animations().add(this.frame);
        node = new PassNode(node);
        return val.compile(node);
    };
};
exports.Line.prototype = Object.create(AstNode.prototype);

exports.Number = function(line, num) {
    AstNode.call(this, line, line);
    this.compile = function(node) {
        new Animations().add(this.frame);
        node = new PassNode(node);
        node.value = Number(num);
        return node;
    };
};
exports.Number.prototype = Object.create(AstNode.prototype);

exports.Variable = function (line, variable) {
    AstNode.call(this, line, line);
    this.name = variable;
    this.compile = function(node) {
        node = new PassNode(node);
        node.value = node.variables.get(this.name).value;
        return node;
    };
};
exports.Variable.prototype = Object.create(AstNode.prototype);

exports.Assign = function(first, last, variable, value) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        node.variables.add(variable.name, value.compile(node));
        node.name = variable.name;
        return node;
    };
};
exports.Assign.prototype = Object.create(AstNode.prototype);

exports.Output = function(first, last, toPrint, type) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        node = toPrint.compile(node);
        new Animations().add(this.frame);
        if (type === 'print') {this.print = node.value;}
        else if (type === 'println') {this.print = node.value + '\n';}
        new Prints().add(this.print);
        return node;
    };
};
exports.Output.prototype = Object.create(AstNode.prototype);

exports.If = function(line, column, cond, block1, block2) {
    AstNode.call(this, line, column);
    this.compile = function(node) {
        node = new PassNode(node);
        var animations = new Animations();
        if (cond.compile(node).value) {
            node = block1.compile(node);
        } else {
            if(block2) {
                node = block2.compile(node);
            }
        }
        animations.add(this.frame);

        return node;
    };
};
exports.If.prototype = Object.create(AstNode.prototype);

exports.Arr = function(line, list) {
    AstNode.call(this, line, line);
    this.compile = function(node) {
        node = new PassNode(node);
        var arr = list.replace(/\[(.*?)\]/g,"$1").split(',').map(function(item) {
            return parseInt(item, 10);
        });
        node.value = arr;
        var highlight = this.highlight;
        var data = arr.slice();
        new Animations().add(function($scope, editor) {
            $scope.data = data;
            $scope.structure = 'array';
            highlight(editor);
        });

        return node;
    };
};
exports.Arr.prototype = Object.create(AstNode.prototype);

exports.Expression = function(first, last, stmnt1, stmnt2, func) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        new Animations().add(this.frame);

        var node1;
        var node2;
        if(stmnt1.name) {
            node1 = node.variables.get(stmnt1.name);
            node2 = stmnt2.compile(node);
        } else if(stmnt2.name) {
            node1 = stmnt1.compile(node);
            node2 = node.variables.get(stmnt2.name);
        } else {
            node1 = stmnt1.compile(node);
            node2 = stmnt2.compile(node);
        }
        node.value = func(node1, node2);
        return node;
    };
};
exports.Expression.prototype = Object.create(AstNode.prototype);

exports.Boolean = function(line, bool) {
    AstNode.call(this, line, line);
    this.compile = function(node) {
        node = new PassNode(node);
        new Animations().add(this.frame);
        node.value = bool;

        return node;
    };
};
exports.Boolean.prototype = Object.create(AstNode.prototype);

exports.Block = function(first, last, stmnts) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        var keys = node.variables.getKeys();
        node = compile(stmnts, node);
        node.variables.removeChildScope(keys);
        return node;
    };
};
exports.Block.prototype = Object.create(AstNode.prototype);

exports.While = function(first, last, cond, block) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        while(cond.compile(node).value) {
            node = block.compile(node);
        }
        return node;
    };
};
exports.While.prototype = Object.create(AstNode.prototype);

exports.DoWhile = function(first, last, block, cond) {
    AstNode.call(this, first, last);

    this.compile = function(node) {
        node = new PassNode(node);
        do {
            node = block.compile(node);
        } while(cond.compile(node).value);
        return node;
    };
};
exports.DoWhile.prototype = Object.create(AstNode.prototype);

exports.Increment = function(line, stmnt) {
    AstNode.call(this, line, line);
    var variable = stmnt.replace('++', '');
    this.compile = function(node) {
        node = new PassNode(node);
        var incrementable = node.variables.get(variable);
        incrementable.value++;
        return node;
    };
};
exports.Increment.prototype = Object.create(AstNode.prototype);

exports.For =function(first, last, decl, cond, exp, block) {
    AstNode.call(this, first, last);

    this.compile = function(node) {
        node = new PassNode(node);
        var keys = node.variables.getKeys();
        node = decl.compile(node);
        while(cond.compile(node).value) {
            node = block.compile(node);
            node = exp.compile(node);
        }
        node.variables.removeChildScope(keys);
        return node;
    };
};
exports.Increment.prototype = Object.create(AstNode.prototype);

exports.FunctionCall = function(first, last, obj, method, params) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        var o = node.variables.get(obj.name);
        var value;
        value = params.compile(node).value;
        o.value[method](value);
        var data = o.value.slice();
        new Animations().add(function($scope, editor) {
            $scope.data = data;
            $scope.structure = 'array';
        });
        return node;
    };
};
exports.FunctionCall.prototype = Object.create(AstNode.prototype);

exports.Add = function(stmnt1, stmnt2) {
    return stmnt1.value + stmnt2.value;
};

exports.Subtract = function(stmnt1, stmnt2) {
    return stmnt1.value - stmnt2.value;
};

exports.Multiply = function(stmnt1, stmnt2) {
    return stmnt1.value * stmnt2.value;
};

exports.Divide = function(stmnt1, stmnt2) {
    return stmnt1.value / stmnt2.value;
};

exports.Pow = function(stmnt1, stmnt2) {
    return Math.pow(stmnt1.value, stmnt2.value);
};

exports.Equal = function(stmnt1, stmnt2) {
    return stmnt1.value === stmnt2.value;
};

exports.Inequal = function(stmnt1, stmnt2) {
    return stmnt1.value !== stmnt2.value;
};

exports.LTE = function(stmnt1, stmnt2) {
    return stmnt1.value <= stmnt2.value;
};

exports.LT = function(stmnt1, stmnt2) {
    return stmnt1.value < stmnt2.value;
};

exports.GTE = function(stmnt1, stmnt2) {
    return stmnt1.value >= stmnt2.value;
};
