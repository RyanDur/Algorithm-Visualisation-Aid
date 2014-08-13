var AstNode = function (line, column) {
    this._line = line;
    this._column = column;
};

exports.Variables = function() {
    var variables = {};
    return {
	add: function(variable, value) {
	    variables[variable] = value;
	    return value || variable;
	},
	get: function(variable) {
	    var val = variables[variable];
	    return val || 0;
	}
    };
}();
