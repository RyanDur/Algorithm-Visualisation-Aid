'use strict';
var scp = require('../../../../app/js/modules/controllers/ScopeCtrl');

describe('ScopeCtrl', function() {
    var ScopeCtrl;
    beforeEach(function() {
	ScopeCtrl = new scp();
    });

    it('should be able to add a variable to the scope', function() {
	var variable = {name: 'a', value: 'hello'};
	ScopeCtrl.addVariable(variable.name, variable);
	expect(ScopeCtrl.getVariable(variable.name)).toBe(variable);
    });

    describe('child scope', function() {
	var parent = {name: 'a', value: 'parent'};
	var child = {name: 'b', value: 'child'};
	var childScope;

	beforeEach(function() {
	    ScopeCtrl.addVariable(parent.name, parent);
	    childScope = ScopeCtrl.childScope();
	    childScope.addVariable(child.name, child);
	});

	it('should be able to pass the variables of the parent to the child', function() {
	    expect(ScopeCtrl.getVariable(parent.name)).toBe(parent);
	    expect(childScope.getVariable(parent.name)).toBe(parent);
	});

	it('should not affect he number of variales in the parent scope', function() {
	    expect(ScopeCtrl.getVariable(child.name)).toBe(undefined);
	    expect(childScope.getVariable(child.name)).toBe(child);
	});

	it('should reflect changes in the parent scope if the child scope changes it', function() {
	    var variable = childScope.getVariable(parent.name);
	    var changed = 'changed';
	    variable.value = changed;
	    expect(ScopeCtrl.getVariable(parent.name).value).toBe(changed);
	});
    });

});
