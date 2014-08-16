'use strict';

exports.Variables = function() {
    var variables = {};
    return {
	add: function(variable, value) {
	    variables[variable] = value;
	},
	get: function(variable) {
	    var val = variables[variable];
	    return val || 0;
	}
    };
}();

exports.Statement = function ifStatement() {
    return {
	if: function(condition, fisrt, second) {
	    second = second === undefined ? null : second;
	    return condition === true ? fisrt : second;
	}
    };
}();

exports.DataStructure = function() {
    var controller;
    return {
	setController: function(ctrl) {
	    controller = ctrl;
	},
	array: function(list) {
	    return list.replace(/\[(.*?)\]/g,"$1").split(',').map(function(item) {
		return parseInt(item, 10);
	    });
	}
    };
}();
