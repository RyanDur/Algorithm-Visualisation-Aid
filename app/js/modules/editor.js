'use strict';

module.exports = function editor(elementId) {
    var codeEditor,
        ace = require('brace'),
        marker;

    require('brace/theme/monokai');
    codeEditor = ace.edit(elementId);
    codeEditor.setTheme('ace/theme/monokai');
    codeEditor.setValue(["var arr <- [1,2,3,4,5];",
                         "print(arr);"].join('\n'));
    codeEditor.clearSelection();

    return {
        getContent: function() {
            return codeEditor.getValue();
        },
        removeHighlight: function() {

        },
        highlightLine: function(line,column) {
            var Range = ace.acequire('ace/range').Range;
            var range = new Range(line, 0, line, column);
            if (marker !== undefined) {
                codeEditor.getSession().removeMarker(marker);
            }
            marker = codeEditor.getSession().addMarker(range, "warning", "background", true);
        }
    };
};
