'use strict';

describe('editorCtrl', function () {
    var mockEditor,
        mockParser,
        mockTimeout,
        scope = {};

    beforeEach(function () {
        mockEditor = {
            getContent: function () {
            },
            highlightLine: function () {
            },
            removeHighlight: function () {
            }
        };
        mockParser = {
            parse: function (val) {
                this.print = "hello";
                this.animation = [];
                return this;
            }
        };
        mockTimeout = function (fn) {
        };
        require('../../../app/js/controllers/editorCtrl')(mockEditor, mockParser)(scope, mockTimeout);
        spyOn(mockEditor, "getContent").and.callThrough();
        spyOn(mockEditor, "highlightLine").and.callThrough();
        spyOn(mockEditor, "removeHighlight").and.callThrough();
        spyOn(mockParser, "parse").and.callThrough();
    });

    it('should make sure the editors value is called', function () {
        scope.getInput();
        expect(mockEditor.getContent).toHaveBeenCalled();
    });

    it('should make sure the parser was called', function () {
        scope.getInput();
        expect(mockParser.parse).toHaveBeenCalled();
    });
});
