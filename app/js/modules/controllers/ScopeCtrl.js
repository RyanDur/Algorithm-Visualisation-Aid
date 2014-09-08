'use strict';

var ScopeCtrl = function (Animations, Prints) {
    var variables = {};
    var loopBreak = false;
    var child = [];
    var value;

    this.addVariable = function (key, value) {
        variables[key] = value;
    };
    this.getVariable = function (key) {
        return variables[key];
    };
    this.childScope = function () {
        child.push(clone(variables));
    };
    this.parentScope = function () {
        variables = transfer(child.pop(), variables);
    };
    this.getBreak = function () {
        return loopBreak;
    };
    this.setValue = function (val) {
        value = val;
    };
    this.getValue = function () {
        return value;
    };
    this.toggleBreak = function () {
        loopBreak = !loopBreak;
    };
    this.addAnimation = function (animation) {
        Animations.add(animation);
    };
    this.getAnimations = function () {
        var animations = Animations.get();
        Animations.clear();
        return animations;
    };
    this.addPrint = function (print) {
        Prints.add(print);
    };
    this.getPrints = function () {
        var prints = Prints.get();
        Prints.clear();
        return prints;
    };
    var transfer = function (parent, child) {
        for (var attr in parent) {
            if (child.hasOwnProperty(attr)) {
                parent[attr] = child[attr];
            }
        }
        return parent;
    };

    var clone = function (obj) {
        if (null === obj || "object" !== typeof obj) {
            return obj;
        }
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    };
};

module.exports = ScopeCtrl;
