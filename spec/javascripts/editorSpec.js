jasmine.getFixtures().fixturesPath = 'base/spec/javascripts/fixtures';
var e = require('../../app/javascripts/editor');


describe('editor', function() {
    var editor;
    beforeEach(function() {
	loadFixtures("editor.html");
	editor = e('editor');
	editor.init();
    });

    it('should be able to retrieve the users content', function() {
	var content = ['// JavaScript',
		       'var a = 3;',
		       '',
		       '// below line has an error which is annotated',
		       'var b ='].join('\n');
	expect(editor.getContent()).toBe(content);
    });

    it('should load the editor into the screen', function() {
	expect($('#editor').html()).toHaveClass("ace_text-input");
    });
});
