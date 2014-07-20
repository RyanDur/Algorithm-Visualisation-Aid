describe('app', function() {
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
