(function () {
    'use strict';

    var Stack = require('./data_structures/stack');
    var Leaf = require('./leaf');

    var Graph = require('graphlib').Graph;

    var def = require('svutils/def');
    var getRandomInt = require('svutils/getRandomInt');

    function generateMap(h, w, opts) {
        opts = def(opts, {});

        var MAX_LEAF_SIZE = def(opts.MAX_LEAF_SIZE, 150);
        var MIN_LEAF_SIZE = def(opts.MIN_LEAF_SIZE, 25);
        var SKIP_SPLIT_ABOVE_MAX = def(opts.SKIP_SPLIT_ABOVE_MAX, 10);
        var SKIP_SPLIT = def(opts.SKIP_SPLIT, 20);

        var leafs = new Stack();

        // start with one solid tile
        var root = new Leaf({
            x: 0,
            y: 0,
            h: h,
            w: w
        });

        leafs.push(root);

        var graph = new Graph([root]);

        // process each 'leaf' (aka vertex)
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

            // adding 2 new edges
            if (leaf.split(MIN_LEAF_SIZE)) {
                graph.insertEdge(leaf, leaf.leftChild);
                graph.insertEdge(leaf, leaf.rightChild);

                leafs.push(leaf.rightChild);
                leafs.push(leaf.leftChild);
            }
        }

        return graph;
    }

    module.exports = generateMap;

}());
