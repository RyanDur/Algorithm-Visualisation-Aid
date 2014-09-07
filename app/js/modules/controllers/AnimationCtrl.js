'use strict';

module.exports = function Animations() {
    var animations = [];
    if (Animations.prototype._instance) {
        return Animations.prototype._instance;
    }
    Animations.prototype._instance = this;

    this.add = function (frame) {
        animations.push(frame);
    };

    this.get = function () {
        return animations;
    };

    this.clear = function () {
        animations = [];
    };
};
