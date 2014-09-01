'use strict';
var Variables = require('./Variables');

module.exports = function PassNode(node) {
    this.variables = node ? node.variables : new Variables();
    this.value = node ? node.value : null;
};
