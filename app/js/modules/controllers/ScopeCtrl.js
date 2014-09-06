'use strict';

var ScopeCtrl = function(variables) {
    variables = variables || {};

    this.addVariable = function(key, value) {
	variables[key] = value;
    };
    this.getVariable = function(key) {
	return variables[key];
    };
    this.childScope = function() {
	return new ScopeCtrl(clone(variables));
    };
    var clone = function(obj) {
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
