'use strict';

module.exports = function editor(elementId) {
    var codeEditor,
        ace = require('brace');
    require('brace/theme/monokai');
    codeEditor = ace.edit(elementId);
    codeEditor.setTheme('ace/theme/monokai');
    codeEditor.setValue(["var arr <- [1,2,3,4,5];",
			 "return arr;"].join('\n'));
    codeEditor.clearSelection();

    return {
        getContent: function() {
            return codeEditor.getValue();
        }
    };
};
