(function () {
    'use strict';

    var generateMap = require('../index');

    var mapTree = generateMap(200, 200);

    console.dir(mapTree);
}());
