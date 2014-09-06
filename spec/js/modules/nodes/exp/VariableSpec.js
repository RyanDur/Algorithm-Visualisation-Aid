describe('Variable', function() {
    var variable;

    beforeEach(function() {
	var AstNodeMock = function(){};
	var PassNodeMock = function(){};
	var Variable = require('../../../../../app/js/modules/nodes/exp/Variable')(AstNodeMock, PassNodeMock);
	variable = new Variable({}, 'name');
    });

    it('should have a name', function() {
	expect(variable.name).toBe('name');
    });
});
