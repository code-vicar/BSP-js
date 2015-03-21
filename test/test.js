(function () {
    'use strict';

    var generateMap = require('../index');

    var map = generateMap(400, 400, {
        MAX_LEAF_SIZE: 150,
        MIN_LEAF_SIZE: 80,
        SKIP_SPLIT_ABOVE_MAX: 2,
        SKIP_SPLIT: 8
    });

    console.log(map);
    console.log(map.vertex(0));
}());
