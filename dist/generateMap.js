(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.generateMap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';

    var Stack = require('./data_structures/stack');
    var Leaf = require('./leaf');

    function isNullOrUndefined(val) {
        return typeof val === undefined || val === null;
    }

    function def(val, _def) {
        if (isNullOrUndefined(val)) {
            return _def;
        }
        return val;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function generateMap(h, w, opts) {
        opts = def(opts, {});
        var MAX_LEAF_SIZE = def(opts.MAX_LEAF_SIZE, 150);
        var MIN_LEAF_SIZE = def(opts.MIN_LEAF_SIZE, 25);
        var SKIP_SPLIT_ABOVE_MAX = def(opts.SKIP_SPLIT_ABOVE_MAX, 10);
        var SKIP_SPLIT = def(opts.SKIP_SPLIT, 20);

        var leafs = new Stack();

        // this is full scene map size
        var root = new Leaf({
            x: 0,
            y: 0,
            h: h,
            w: w
        });

        leafs.push(root);

        while (leafs.length()) {
            var leaf = leafs.pop();
            if (!leaf) {
                continue;
            }

            // chance that a leaf won't split at all
            if (getRandomInt(0, 100) < SKIP_SPLIT_ABOVE_MAX) {
                console.log('skip split');
                continue;
            }

            // additional chance of a leaf not splitting when it is within the allowed max size
            if ((leaf.size.h <= MAX_LEAF_SIZE && leaf.size.w <= MAX_LEAF_SIZE) && getRandomInt(0, 100) < SKIP_SPLIT) {
                console.log('full size, skip split');
                continue;
            }

            if (leaf.split(MIN_LEAF_SIZE)) {
                leafs.push(leaf.rightChild);
                leafs.push(leaf.leftChild);
            }
        }

        return root;
    }

    module.exports = generateMap;

}());

},{"./data_structures/stack":2,"./leaf":6}],2:[function(require,module,exports){
(function () {
    'use strict';

    var Stack = function Stack() {
        this.container = [];
    };

    // push a value onto the top of the stack
    Stack.prototype.push = function push(val) {
        this.container.unshift(val);
    };

    // pop a value off the top of the stack
    Stack.prototype.pop = function pop() {
        if (this.container.length > 0) {
            return (Array.prototype.splice.call(this.container, 0, 1))[0];
        }
        return null;
    };

    Stack.prototype.length = function length() {
        return this.container.length;
    };

    // see the value of the item on the top of the stack
    Stack.prototype.peek = function peek() {
        if (this.container.length > 0) {
            return this.container[0];
        }
        return null;
    };

    module.exports = Stack;
}());

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./point":3,"./size":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
(function () {
    'use strict';

    function isNullOrUndefined(val) {
        return typeof val === 'undefined' || val === null;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //Inherit from rectangle

    var Rectangle = require('./geometry/rectangle');

    var Leaf = function Leaf(args) {
        Rectangle.call(this, args, true);
    };

    Leaf.prototype = Object.create(Rectangle.prototype);
    Leaf.prototype.constructor = Leaf;

    Object.defineProperty(Leaf.prototype, 'leftChild', {
        enumerable: true,
        configurable: false,
        writable: true
    });

    Object.defineProperty(Leaf.prototype, 'rightChild', {
        enumerable: true,
        configurable: false,
        writable: true
    });

    function splitH(leaf, splitPos) {
        leaf.leftChild = new Leaf({
            x: leaf.pos.x,
            y: leaf.pos.y,
            w: leaf.size.w,
            h: splitPos
        });
        leaf.rightChild = new Leaf({
            x: leaf.pos.x,
            y: leaf.pos.y + splitPos,
            w: leaf.size.w,
            h: leaf.size.h - splitPos
        });
    }

    function splitV(leaf, splitPos) {
        leaf.leftChild = new Leaf({
            x: leaf.pos.x,
            y: leaf.pos.y,
            w: splitPos,
            h: leaf.size.h
        });
        leaf.rightChild = new Leaf({
            x: leaf.pos.x + splitPos,
            y: leaf.pos.y,
            w: leaf.size.w - splitPos,
            h: leaf.size.h
        });
    }

    Leaf.prototype.split = function split(MIN_SIZE) {
        if (!isNullOrUndefined(this.leftChild) || !isNullOrUndefined(this.rightChild)) {
            //console.log('this is already split...');
            return false;
        }

        var m2 = 2 * MIN_SIZE;
        var splittableH = this.size.h - m2;
        var splittableV = this.size.w - m2;
        if (splittableH <= 0 && splittableV <= 0) {
            //console.log('this is too small to split');
            return false;
        }

        if (splittableH <= 0) {
            // if we can't split horizontally then we must split vertically
            splitV(this, getRandomInt(0, splittableV) + MIN_SIZE);
        } else if (splittableV <= 0) {
            // if we can't split vertically then we must split horizontally
            splitH(this, getRandomInt(0, splittableH) + MIN_SIZE);
        } else {
            // we can split in either direction
            // add a bit of rng when determining which axis to split
            if (getRandomInt(0, 101) <= 50) {
                splitV(this, getRandomInt(0, splittableV) + MIN_SIZE);
            } else {
                splitH(this, getRandomInt(0, splittableH) + MIN_SIZE);
            }
        }

        //console.log('split complete');
        return true;
    };

    module.exports = Leaf;
}());

},{"./geometry/rectangle":4}]},{},[1])(1)
});