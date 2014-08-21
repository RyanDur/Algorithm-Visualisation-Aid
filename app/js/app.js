'use strict';
// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs

var angular = require('angular');

var editor = require('./modules/editor')('editor');
var grammar = require("./grammars/grammar");
var ast = require("./modules/astM");
var parser = require('./modules/parser')(grammar, ast);

var editorCtrl = require('./controllers/editorCtrl')(editor, parser);
var dataStructure = require('./directives/dataStructure');


var app = angular.module('ava', []);
app.controller('EditorCtrl', ['$scope', '$timeout', editorCtrl]);

app.directive('datastructure', dataStructure);
