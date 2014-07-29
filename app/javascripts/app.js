'use strict';
var angular = require('angular');
var editor = require('./editor');
var app = angular.module('ava', []);


app.controller('editorCtrl', [function() {
    editor('editor');
}]);


app.directive('editor', function() {
    return {
        restrict: 'E',
        replace: true,
        template: "<div id='editor'></div>"
    };
});
