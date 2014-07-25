'use strict';
var consoleEditor = require('./editor');

exports.editor = function() {
    var id = 'editor';
    return {
        restrict: 'E',
        replace: true,
        template: "<div id='editor'></div>",
        link: function() {
            consoleEditor(id);
        }
    };
};
