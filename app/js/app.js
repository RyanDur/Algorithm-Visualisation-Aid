'use strict';
// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
var angular = require('angular');
var editor = require('./modules/editor');

var app = angular.module('ava', []);
app.controller('EditorCtrl', require('./controllers/editorCtrl')(editor));

$(document).foundation();
