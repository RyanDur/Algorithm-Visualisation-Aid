'use strict';
// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
require('./extensions/arrayExtension');
var ng = require('angular');

var editor = require('./modules/editor')('editor');
var grammar = require("./grammars/grammar");
var ast = require("./modules/astM");
var parser = require('./modules/parser')(grammar, ast);

var editorCtrl = require('./controllers/editorCtrl')(editor, parser);
var dataStructure = require('./directives/dataStructure');
var push = require('./directives/push');
var pop = require('./directives/pop');
var none = require('./directives/none');
var lengthDir = require('./directives/length');
var variable = require('./directives/variable');
var access = require('./directives/AccessToAccess');
var ana = require('./directives/AnswerToAccess');


var app = ng.module('ava', []);
app.controller('EditorCtrl', ['$scope', '$timeout', editorCtrl]);

app.directive('datastructure', ['$timeout', '$compile', dataStructure]);

app.directive('push', push);
app.directive('pop', pop);
app.directive('none', none);
app.directive('length', lengthDir);
app.directive('variable', variable);
app.directive('ata', access);
app.directive('ana', ana);
