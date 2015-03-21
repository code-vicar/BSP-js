(function () {
    'use strict';

    var Point = require('./point');
    var Size = require('./size');

    var VertexFactory = require('graphlib').VertexFactory;

    var Vertex = VertexFactory.defineVertex();

    var Rectangle = function Rectangle(args, isFinal) {
        // generate an id for this vertex
        Vertex.call(this, this.genid());

        var x = args.x || 0;
        var y = args.y || 0;
        var h = args.h || 0;
        var w = args.w || 0;

        Object.defineProperty(this, 'pos', {
            enumerable: true,
            configurable: false,
            writable: true,
            value: new Point(x, y, isFinal)
        });

        Object.defineProperty(this, 'size', {
            enumerable: true,
            configurable: false,
            writable: true,
            value: new Size(h, w, isFinal)
        });

        if (isFinal) {
            Object.defineProperty(this, 'pos', {
                writable: false
            });

            Object.defineProperty(this, 'size', {
                writable: false
            });
        }
    };

    Rectangle.prototype = Object.create(Vertex.prototype);
    Rectangle.prototype.constructor = Rectangle;

    Rectangle.prototype.genid = function () {
        Rectangle.prototype.gids = Rectangle.prototype.gids || 0;
        return Rectangle.prototype.gids++;
    };

    Object.defineProperty(Rectangle.prototype, 'gid', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: 0
    });

    module.exports = Rectangle;
}());
