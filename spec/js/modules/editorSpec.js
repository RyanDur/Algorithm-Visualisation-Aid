jasmine.getFixtures().fixturesPath = 'base/spec/js/fixtures';
var e = require('../../../app/js/modules/editor');

describe('editor', function() {
    var editor;
    beforeEach(function() {
	loadFixtures("editor.html");
	editor = e('editor');
    });

    it('should be able to retrieve the users content', function() {
	var content = ["var arr <- [];",
		       "for(var i <- 0; i < 5; i++) {",
		       "\tarr.push(i);",
		       "}",
                       "print(arr);"].join('\n');
	expect(editor.getContent()).toBe(content);
    });

    it('should load the editor into the screen', function() {
	expect($('#editor').html()).toHaveClass("ace_text-input");
    });
});
