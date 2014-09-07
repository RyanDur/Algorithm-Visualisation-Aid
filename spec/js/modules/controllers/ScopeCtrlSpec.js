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

    it('should return true if it encounters a break', function() {
	expect(ScopeCtrl.getBreak()).toBe(false);
	ScopeCtrl.toggleBreak();
	expect(ScopeCtrl.getBreak()).toBe(true);
    });

    describe('child scope', function() {
	var parent = {name: 'a', value: 'parent'};
	var child = {name: 'b', value: 'child'};
	var childScope;

	beforeEach(function() {
	    ScopeCtrl.addVariable(parent.name, parent);
	});

	it('should be able to pass the variables of the parent to the child', function() {
	    expect(ScopeCtrl.getVariable(parent.name)).toBe(parent);
	    ScopeCtrl.childScope();
	    expect(ScopeCtrl.getVariable(parent.name)).toBe(parent);
	});

	it('should not affect he number of variales in the parent scope', function() {
	    ScopeCtrl.childScope();
	    ScopeCtrl.addVariable(child.name, child);
	    expect(ScopeCtrl.getVariable(child.name)).toBe(child);
	    ScopeCtrl.parentScope();
	    expect(ScopeCtrl.getVariable(child.name)).toBe(undefined);
	});

	it('should reflect changes in the parent scope if the child scope changes it', function() {
	    var variable = ScopeCtrl.getVariable(parent.name);
	    var changed = 'changed';
	    variable.value = changed;
	    ScopeCtrl.childScope();
	    ScopeCtrl.addVariable(child.name, child);

	    expect(ScopeCtrl.getVariable(parent.name).value).toBe(changed);
	});

	it('should be able to make multiple nested scopes', function() {
	    var grandChild = {name: 'c', value: 'grandChild'};
	    ScopeCtrl.childScope();
	    ScopeCtrl.addVariable(child.name, child);
	    expect(ScopeCtrl.getVariable(child.name)).toBe(child);
	    expect(ScopeCtrl.getVariable(parent.name)).toBe(parent);

	    ScopeCtrl.childScope();
	    ScopeCtrl.addVariable(grandChild.name, grandChild);
	    expect(ScopeCtrl.getVariable(parent.name)).toBe(parent);
	    expect(ScopeCtrl.getVariable(child.name)).toBe(child);
	    expect(ScopeCtrl.getVariable(grandChild.name)).toBe(grandChild);

	    ScopeCtrl.parentScope();
	    expect(ScopeCtrl.getVariable(parent.name)).toBe(parent);
	    expect(ScopeCtrl.getVariable(child.name)).toBe(child);
	    expect(ScopeCtrl.getVariable(grandChild.name)).toBe(undefined);

	    ScopeCtrl.parentScope();
	    expect(ScopeCtrl.getVariable(parent.name)).toBe(parent);
	    expect(ScopeCtrl.getVariable(child.name)).toBe(undefined);
	    expect(ScopeCtrl.getVariable(grandChild.name)).toBe(undefined);

	});
    });

});
