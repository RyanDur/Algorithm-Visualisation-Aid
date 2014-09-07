'use strict';

module.exports = function (first, last) {
    this.highlight = function(editor) {
        editor.removeHighlight();
        editor.setHighlight(first.first_line,
                            last.last_line,
                            first.first_column,
                            last.last_column);
    };
    var highlight = this.highlight;
    this.frame = function(scope, editor) {
        highlight(editor);
    };
};
