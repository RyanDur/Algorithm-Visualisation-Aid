'use strict';

module.exports = function(app, editor) {
    app.controller('editorCtrl', [function() {
	editor('editor').init();
    }]);
};
