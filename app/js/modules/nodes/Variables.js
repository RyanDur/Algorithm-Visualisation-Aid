'use strict';

module.exports = function() {
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
