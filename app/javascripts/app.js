'use strict';

var angular = require('angular');
var editor = require('./editor');

var app = angular.module('ava', []);
app.controller('editorCtrl',
	       ['scope', require('./controllers/editorCtrl')(editor)]);

require('./directives/editor')(app);
