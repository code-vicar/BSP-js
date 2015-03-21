(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.generateMap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./data_structures/stack":2,"./leaf":6,"graphlib":7,"svutils/def":14,"svutils/getRandomInt":15}],2:[function(require,module,exports){
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

},{"./point":3,"./size":5,"graphlib":7}],5:[function(require,module,exports){
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

},{"./geometry/rectangle":4}],7:[function(require,module,exports){
(function () {
    'use strict';

    var EdgeFactory = require('./lib/edge');
    var VertexFactory = require('./lib/vertex');
    var Graph = require('./lib/graph');
    var BFS = require('./lib/bfs/bfs');

    module.exports = {
        EdgeFactory: EdgeFactory,
        VertexFactory: VertexFactory,
        Graph: Graph,
        BFS: BFS
    };

}());

},{"./lib/bfs/bfs":8,"./lib/edge":9,"./lib/graph":10,"./lib/vertex":11}],8:[function(require,module,exports){
(function () {
    'use strict';

    var Graph = require('../graph');

    var VertexBase = require('../vertex').VertexBase;

    var BFS = function BFS(graph, start) {
        if (!(graph instanceof Graph)) {
            throw new TypeError('first argument must be an instance of Graph');
        }

        if (!(start instanceof VertexBase)) {
            throw new TypeError('second argument must be an instance of Vertex');
        }

    };

    module.exports = BFS;
}());

},{"../graph":10,"../vertex":11}],9:[function(require,module,exports){
(function () {
    'use strict';

    var EdgeFactory = module.exports = {};

    // allow creation of edge classes with extra properties
    //  e.g. weight, label, etc...
    EdgeFactory.defineEdge = function (props) {
        var Edge = function Edge(v, args) {
            this.v = v;

            if (typeof args === 'object') {
                var keys = Object.keys(args);
                var i = 0,
                    len = keys.length;
                for (i = 0; i < len; i++) {
                    this[keys[i]] = args[keys[i]];
                }
            }
        };

        props = props || [];
        props.forEach(function (prop) {
            if (typeof prop === 'undefined' || prop === null) {
                return;
            }

            if (typeof prop !== 'string' && !(typeof prop === 'object' && typeof prop.name === 'string')) {
                return;
            }

            var def = prop;
            if (typeof def === 'string') {
                def = {
                    name: def
                };
            }

            if (!def.config) {
                def.config = {
                    writable: true
                };
            }
            Object.defineProperty(Edge.prototype, def.name, def.config);
        });

        Object.defineProperty(Edge.prototype, 'v', {
            enumerable: true,
            writable: true
        });

        return Edge;
    };

}());

},{}],10:[function(require,module,exports){
(function () {
    'use strict';

    var isNullOrUndefined = require('svutils/isNullOrUndefined');
    var isArray = require('svutils/isArray');

    var Graph = function Graph(nvertices, opts) {
        var graph = this;

        // unwrap the options
        var optsEdgeClass = null,
            optsDirected = false;
        if (!isNullOrUndefined(opts) && !isNullOrUndefined(opts.EdgeClass)) {
            optsEdgeClass = opts.EdgeClass;
        }
        if (!isNullOrUndefined(opts) && !isNullOrUndefined(opts.directed)) {
            optsDirected = opts.directed;
        }

        // property 'directed' is privately read/write
        // but publicly read only
        var isGraphDirected = !!optsDirected;
        Object.defineProperty(graph, 'directed', {
            enumerable: true,
            configurable: false,
            get: function () {
                return isGraphDirected;
            }
        });

        graph.adjacencies = {};
        graph.degrees = {};
        if (isGraphDirected) {
            graph.degreesOut = {};
            graph.degreesIn = {};
        }

        var vertices = {};
        if (typeof nvertices === 'number') {
            graph.nvertices = nvertices;
        } else if (isArray(nvertices)) {
            graph.nvertices = nvertices.length;
            nvertices.forEach(function (vertex) {
                vertices[vertex.id] = vertex;
                graph.degrees[vertex.id] = 0;
            });
        }

        graph.vertex = function (id) {
            return vertices[id];
        };

        var privateInsertEdge = function privateInsertEdge(x, y, directed, edgeArgs) {
            var degX, degY, degXOut, degYIn;

            // update vertex map
            if (isNullOrUndefined(vertices[x.id])) {
                graph.nvertices++;
                vertices[x.id] = x;
            }
            if (isNullOrUndefined(vertices[y.id])) {
                graph.nvertices++;
                vertices[y.id] = y;
            }

            // increment counts
            graph.nedges++;

            if (isGraphDirected) {
                //inc x total
                degX = graph.degrees[x.id] || 0;
                degX++;
                graph.degrees[x.id] = degX;
                //inc x out
                degXOut = graph.degreesOut[x.id] || 0;
                degXOut++;
                graph.degreesOut[x.id] = degXOut;
                // inc y total
                degY = graph.degrees[y.id] || 0;
                degY++;
                graph.degrees[y.id] = degY;
                // inc y in
                degYIn = graph.degreesIn[y.id] || 0;
                degYIn++;
                graph.degreesIn[y.id] = degYIn;
            } else {
                degX = graph.degrees[x.id] || 0;
                degX++;
                graph.degrees[x.id] = degX;
            }

            // fetch the adjacency list
            var listX = graph.adjacencies[x.id] || [];

            // create the edge and add it to the list
            if (!optsEdgeClass) {
                listX.push(y.id);
            } else {
                listX.push(new optsEdgeClass(y.id, edgeArgs));
            }

            graph.adjacencies[x.id] = listX;

            // if this is an undirected edge, then add the opposite edge
            if (!directed) {
                privateInsertEdge(y, x, true, edgeArgs);
            }
        };

        graph.insertEdge = function insertEdge(x, y, edgeArgs) {
            privateInsertEdge(x, y, isGraphDirected, edgeArgs);
        };
    };

    Object.defineProperty(Graph.prototype, 'nvertices', {
        enumerable: true,
        configurable: false,
        writable: true,
        value: 0
    });

    Object.defineProperty(Graph.prototype, 'nedges', {
        enumerable: true,
        configurable: false,
        writable: true,
        value: 0
    });

    Object.defineProperty(Graph.prototype, 'degrees', {
        enumerable: true,
        configurable: false,
        writable: true,
        value: {}
    });

    module.exports = Graph;

}());

},{"svutils/isArray":12,"svutils/isNullOrUndefined":13}],11:[function(require,module,exports){
(function () {
    'use strict';

    var VertexFactory = module.exports = {};

    VertexFactory.VertexBase = function VertexBase() {};

    VertexFactory.defineVertex = function (props) {
        var Vertex = function Vertex(id) {
            VertexFactory.VertexBase.call(this);
            Object.defineProperty(this, 'id', {
                enumerable: true,
                writable: false,
                value: id
            });
        };

        Vertex.prototype = Object.create(VertexFactory.VertexBase.prototype);
        Vertex.prototype.constructor = Vertex;

        props = props || [];

        props.forEach(function (prop) {
            // is prop null?
            if (typeof prop === 'undefined' || prop === null) {
                return;
            }

            // is prop either a string, or an object?
            if (typeof prop !== 'string' || !(typeof prop === 'object' && prop.name)) {
                return;
            }

            var def = prop;
            // if prop was a string, make it an object
            if (typeof def === 'string') {
                def = {
                    name: def
                };
            }

            if (!def.config) {
                def.config = {
                    writable: true
                };
            }

            Object.defineProperty(Vertex.prototype, def.name, def.config);
        });

        return Vertex;
    };

}());

},{}],12:[function(require,module,exports){
module.exports = function (arg) {
    'use strict';

    return Object.prototype.toString.call(arg) === '[object Array]';
};

},{}],13:[function(require,module,exports){
module.exports = function isNullOrUndefined(val) {
    'use strict';

    return (typeof val === 'undefined' || val === null);
};

},{}],14:[function(require,module,exports){
var isNullOrUndefined = require('../isNullOrUndefined');

module.exports = function def(val, _def) {
    'use strict';

    if (isNullOrUndefined(val)) {
        return _def;
    }
    return val;
};

},{"../isNullOrUndefined":16}],15:[function(require,module,exports){
module.exports = function getRandomInt(min, max) {
    'use strict';

    return Math.floor(Math.random() * (max - min)) + min;
};

},{}],16:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"dup":13}]},{},[1])(1)
});