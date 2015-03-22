(function () {
    'use strict';

    var isNullOrUndefined = require('svutils/isNullOrUndefined');
    var getRandomInt = require('svutils/getRandomInt');

    // Inherit Rectangle

    var Rectangle = require('./geometry/rectangle');

    var Leaf = function Leaf(args) {
        Rectangle.call(this, args, true);
    };

    Leaf.prototype = Object.create(Rectangle.prototype);
    Leaf.prototype.constructor = Leaf;

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
