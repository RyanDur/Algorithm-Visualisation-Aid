'use strict';

module.exports = function editor(elementId) {
    var codeEditor,
        ace = require('brace');
    require('brace/theme/monokai');
    codeEditor = ace.edit(elementId);
    codeEditor.setTheme('ace/theme/monokai');
    codeEditor.setValue(['// JavaScript',
                         'var a = 3;',
                         '',
                         '// below line has an error which is annotated',
                         'var b ='].join('\n'));
    codeEditor.clearSelection();

    return {
        getContent: function() {
            return codeEditor.getValue();
        }
    };
};
