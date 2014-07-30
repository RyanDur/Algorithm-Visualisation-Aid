'use strict';

var angular = require('angular');
var editor = require('./editor');

var app = angular.module('ava', []);
require('./controllers/editorCtrl')(app, editor);
require('./directives/editor')(app);
