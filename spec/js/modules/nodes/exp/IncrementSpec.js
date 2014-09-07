'use strict';

describe('Increment', function () {
    var increment;
    var ScopeMock = function () {
        var variables = {'i': 0};
        this.addVariable = function (key, value) {
            variables[key] = value;
        };
        this.getVariable = function (key) {
            return variables[key];
        };
    };

    var mockScope;
    beforeEach(function () {
        mockScope = new ScopeMock();
        var inc = require('../../../../../app/js/modules/nodes/exp/Increment');
        increment = new inc({}, 'i++');
    });

    it('should increment a variable', function () {
        increment.compile(mockScope);
        expect(mockScope.getVariable('i')).toBe(1);
        increment.compile(mockScope);
        expect(mockScope.getVariable('i')).toBe(2);
    });
});
