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
