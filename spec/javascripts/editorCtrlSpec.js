'use strict';

describe('editorCtrl', function() {
    var mockEditor,
	controller,
        editorCtrl,
        scope = {},
	expected;

    beforeEach(function() {
	expected = "hello";
        mockEditor = {
            getValue: function() {
                return expected;
            }
        };
	var mock = function($scope){return mockEditor;};
        require('../../app/javascripts/controllers/editorCtrl')(mock)(scope);
	spyOn(mockEditor, "getValue").and.callThrough();
    });

    it('should return the input value in the editor', function() {
	expect(scope.getInput()).toBe(expected);
    });

    it('should make sure the editors value is called', function() {
	scope.getInput();
        expect(mockEditor.getValue).toHaveBeenCalled();
    });
});
