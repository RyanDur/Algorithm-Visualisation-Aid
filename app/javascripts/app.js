var angular = require('angular');
var code = require('./editorDirective');
var app = angular.module('ava', []);


app.controller('editorCtrl', function() {});


app.directive('editor', code.editor);
