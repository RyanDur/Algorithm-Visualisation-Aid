'use strict';
// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs

var angular = require('angular');

var editor = require('./modules/editor')('editor');
var grammar = require("./grammars/grammar");

var ast = require("./modules/astM");
var parser = require('./modules/parser')(grammar, ast);

var editorCtrl = require('./controllers/editorCtrl')(editor, parser,ast.config());

var app = angular.module('ava', []);

app.controller('EditorCtrl', ['$scope', editorCtrl]);

app.directive('datastructure', function() {
    return {
	restrict: 'E',
        replace: false,
        scope: {
            data: "=",
            structure: "@"
        },
        templateUrl: "templates/data_array.html"
    };
});
