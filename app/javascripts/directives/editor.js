'use strict';

module.exports = function(app) {
    return app.directive('editor', function() {
	return {
            restrict: 'E',
            replace: true,
            template: "<div id='editor'></div>"
	};
    });
};
