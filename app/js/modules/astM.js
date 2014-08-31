'use strict';

var AstNode = function (first, last) {
    this.highlight = function(editor) {
        editor.removeHighlight();
        editor.setHighlight(first.first_line,
                            last.last_line,
                            first.first_column,
                            last.last_column);
    };
    this.animation = [];
    var highlight = this.highlight;
    this.frame = function(scope, editor) {
        highlight(editor);
    };
};

var Variables = function() {
    var variables = {};

    this.add = function(key, value) {
        variables[key] = value;
    };
    this.get = function(key) {
        return variables[key] || {value: ''};
    };
    this.getKeys = function() {
        var keys = [];
        for(var key in variables) {
            if(key) {
                keys.push(key);
            }
        }
        return keys;
    };
    this.removeChildScope = function(keys) {
        for(var v in variables) {
            if(keys.indexOf(v) < 0) {
                delete variables[v];
            }
        }
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

    this.clear = function() {
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

var compile = function(stmnts, node) {
    var passNode = node;
    for (var i = 0; i < stmnts.length; i++) {
        passNode = stmnts[i].compile(passNode);
    }
    return passNode;
};

var PassNode = function(node) {
    this.variables = node ? node.variables : new Variables();
    this.value = node ? node.value : null;
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
        node = val.compile(node);
        return node;
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
        new Animations().add(this.frame);
        return node;
    };
};
exports.Variable.prototype = Object.create(AstNode.prototype);

exports.Assign = function(first, last, variable, value) {
    AstNode.call(this, first, last);

    this.compile = function(node) {
        node = new PassNode(node);
        new Animations().add(this.frame);
        value.name = variable.name;
        node.variables.add(variable.name, value.compile(node));
        return node;
    };
};
exports.Assign.prototype = Object.create(AstNode.prototype);

exports.Output = function(first, last, toPrint, type) {
    AstNode.call(this, first, last);
    this.compile = function(node) {
        node = new PassNode(node);
        node = toPrint.compile(node);
        if(toPrint.name) {
            toPrint = node.variables.get(toPrint.name);
        } else {
            toPrint = node;
        }
        new Animations().add(this.frame);
        if (type === 'print') {this.print = toPrint.value;}
        else if (type === 'println') {this.print = toPrint.value + '\n';}
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
        new Animations().add(function($scope, editor) {
            $scope.data = arr;
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
