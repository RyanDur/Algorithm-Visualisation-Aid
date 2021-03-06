'use strict';

module.exports = function editor(elementId) {
    var codeEditor,
        ace = require('brace'),
        marker = 0, session,
        Range = ace.acequire('ace/range').Range;

    require('brace/theme/monokai');
    codeEditor = ace.edit(elementId);
    codeEditor.setTheme('ace/theme/monokai');
    codeEditor.setValue(["var arr <- [];",
        "for(var i <- 0; i < 5; i++) {",
        "\tarr.push(i);",
        "}",
        "print(arr);"].join('\n'));
    codeEditor.clearSelection();
    session = codeEditor.session;

    return {
        getContent: function () {
            return session.getValue();
        },
        removeHighlight: function () {
            if (marker !== undefined) {
                session.removeMarker(marker);
            }
        },
        setHighlight: function (fistLine, lastLine, firstColumn, lastColumn) {
            var range = new Range(fistLine - 1, firstColumn - 1, lastLine - 1, lastColumn - 1);
            marker = session.addMarker(range, "warning", null, true);
        }
    };
};
