(function () {
    'use strict';

    var Point = function Point(x, y, isFinal) {
      this.x = x;
      this.y = y;

      if (isFinal) {
        Object.defineProperty(this, 'x', {
            writable: false
        });

        Object.defineProperty(this, 'y', {
            writable: false
        });
      }
    };

    Object.defineProperty(Point.prototype, 'x', {
        enumerable: true,
        configurable: false,
        writable: true
    });

    Object.defineProperty(Point.prototype, 'y', {
        enumerable: true,
        configurable: false,
        writable: true
    });

    module.exports = Point;
}());
