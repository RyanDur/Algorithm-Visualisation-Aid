'use strict';

module.exports = function Prints() {
    var prints = '';
    if (Prints.prototype._instance) {
        return Prints.prototype._instance;
    }
    Prints.prototype._instance = this;

    this.add = function (print) {
        prints += print;
    };

    this.get = function () {
        return prints;
    };

    this.clear = function () {
        prints = '';
    };
};
