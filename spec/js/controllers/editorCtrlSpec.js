'use strict';

describe('editorCtrl', function() {
    var mockEditor,
	mockParser,
	controller,
        editorCtrl,
        scope = {},
	expected;

    beforeEach(function() {
	expected = "hello";
        mockEditor = {
            getContent: function() {
                return expected;
            }
        };
	mockParser = {
	    parse: function(val) {}
	};
        require('../../../app/js/controllers/editorCtrl')(mockEditor, mockParser)(scope);
	spyOn(mockEditor, "getContent").and.callThrough();
	spyOn(mockParser, "parse").and.callThrough();
    });

    it('should make sure the editors value is called', function() {
	scope.getInput();
        expect(mockEditor.getContent).toHaveBeenCalled();
    });

    it('should make sure the parser was called', function() {
	scope.getInput();
	expect(mockParser.parse).toHaveBeenCalled();
    });
});
