'use strict';

module.exports = function editor(elementId) {
    var codeEditor;

    return {
        init: function() {
	    var ace = require('brace');
	    require('brace/mode/javascript');
	    require('brace/theme/monokai');

	    codeEditor = ace.edit(elementId);
            codeEditor.getSession().setMode('ace/mode/javascript');
            codeEditor.setTheme('ace/theme/monokai');
            codeEditor.setValue(['// JavaScript',
				 'var a = 3;',
				 '',
				 '// below line has an error which is annotated',
				 'var b ='].join('\n'));
            codeEditor.clearSelection();
        },
        getContent: function() {
            return codeEditor.getValue();
        }
    };
};
