module.exports = function (grunt) {
    'use strict';

    var browserify = require('browserify');
    var fs = require('fs');

    grunt.registerTask('default', function () {
        var done = this.async();

        browserify({
            entries: ['./index.js'],
            standalone: 'generateMap',
            basedir: __dirname
        }).bundle(function (err, buf) {
            if (err) {
                throw err;
            }

            fs.writeFile('dist/generateMap.js', buf, function (err) {
                if (err) {
                    throw err;
                }

                done();
            });
        });
    });
};
