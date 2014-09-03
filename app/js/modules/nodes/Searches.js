'use strict';

module.exports = function Searches() {
    var searches = [];
    if (Searches.prototype._instance) {
        return Searches.prototype._instance;
    }
    Searches.prototype._instance = this;

    this.add = function(frame) {
        searches.push(frame);
    };

    this.get = function() {
        return searches.slice();
    };

    this.clear = function() {
        searches = [];
    };
};
