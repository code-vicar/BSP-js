(function () {
    'use strict';

    var Point = require('./point');
    var Size = require('./size');

    var Rectangle = function Rectangle(args, isFinal) {
        var x = args.x || 0;
        var y = args.y || 0;
        var h = args.h || 0;
        var w = args.w || 0;

        this.pos = new Point(x, y, isFinal);
        this.size = new Size(h, w, isFinal);

        if (isFinal) {
            Object.defineProperty(this, 'pos', {
                writable: false
            });

            Object.defineProperty(this, 'size', {
                writable: false
            });
        }
    };

    Object.defineProperty(Rectangle.prototype, 'pos', {
        enumerable: true,
        configurable: false,
        writable: true
    });

    Object.defineProperty(Rectangle.prototype, 'size', {
        enumerable: true,
        configurable: false,
        writable: true
    });

    module.exports = Rectangle;
}());
