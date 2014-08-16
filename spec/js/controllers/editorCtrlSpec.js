'use strict';

describe('editorCtrl', function() {
    var mockEditor,
	mockParser,
	controller,
        editorCtrl,
        scope;

    beforeEach(function() {
        mockEditor = { getContent: function() {}};
	mockParser = { parse: function(val) {}};
	scope = { $watch: function(){}};
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
