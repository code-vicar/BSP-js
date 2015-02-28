(function () {
    'use strict';

    var Size = function Size(h, w, isFinal) {
      this.h = h;
      this.w = w;

      if (isFinal) {
        Object.defineProperty(this, 'h', {
            writable: false
        });

        Object.defineProperty(this, 'w', {
            writable: false
        });
      }
    };

    Object.defineProperty(Size.prototype, 'h', {
        enumerable: true,
        configurable: false,
        writable: true
    });

    Object.defineProperty(Size.prototype, 'w', {
        enumerable: true,
        configurable: false,
        writable: true
    });

    module.exports = Size;
}());
