jasmine.getFixtures().fixturesPath = 'base/specs/scripts/fixtures';
var app = require('../../app/scripts/app');

describe('app', function() {
    beforeEach(function() {
	loadFixtures('editor.html');
    });


    it('should be true', function() {
	expect(true).toBe(true);
    });

    it('should be false', function() {
	expect(false).toEqual(false);
    });

    it('should be false', function() {
	expect(false).toBe(false);
    });
});
