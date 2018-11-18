import debugFactory from 'debug'
import shuffle from 'lodash.shuffle'
import { Graph } from '@code-vicar/graphlib'
import { Stack } from './data_structures/stack'
import { Rectangle } from './geometry/rectangle'
import { getRandomIntInclusive } from './service/get_random_int_inclusive'
import { splitRectangleRandom } from './service/split_rectangle_random'
import { Counter } from './service/counter'

const debug = debugFactory('bsp:generate_map')

export function generateMap(h, w, {
    minHeight = 25,
    stopHeight = 60,
    minWidth = 25,
    stopWidth = 60,
    ignoreSplitPercent = 10,
    ignoreStopPercent = 10
} = {}) {
    const settings = {
        height: {
            min: minHeight,
            stop: stopHeight
        },
        width: {
            min: minWidth,
            stop: stopWidth
        }
    }
    const nodesToSplit = new Stack()
    const idCounter = new Counter()

    // start with one solid tile
    const rootNode = new Rectangle({
        origin: {
            x: 0,
            y: 0
        },
        size: {
            height: h,
            width: w
        }
    })

    rootNode['@@vertexId'] = idCounter.next()
    nodesToSplit.push(rootNode)

    const graph = new Graph([rootNode])

    while (nodesToSplit.length > 0) {
        const node = nodesToSplit.pop()
        debug('processing node %s', node['@@vertexId'])

        // chance that a node won't split at all
        const ignoreSplit = getRandomIntInclusive(0, 100) < ignoreSplitPercent
        if (ignoreSplit) {
            debug('split skipped')
            continue
        }

        // shuffle the sides so we aren't always processing them
        // in the same order
        const sides = shuffle(['height', 'width'])
        sides.reduce((processed, side) => {
            if (processed) {
                // already processed the node on another side
                return true
            }

            // check if the side is within the stopping length
            const isStop = node.size[side] <= settings[side].stop
            const ignoreStop = getRandomIntInclusive(0, 100) < ignoreStopPercent
            if (isStop) {
                if (!ignoreStop) {
                    debug('stopping split for side, %s %s', side, node.size[side])
                    return false
                }
                debug('stop skipped for side, %s: %s', side, node.size[side])
            }

            const halves = splitRectangleRandom(node, settings[side].min, side)
            if (!halves) {
                // couldn't split on this side
                debug('unable to split for side, %s: %s', side, node.size[side])
                return false
            }

            halves[0]['@@vertexId'] = idCounter.next()
            halves[1]['@@vertexId'] = idCounter.next()
            graph.insertConnect(node, halves[0])
            graph.insertConnect(node, halves[1])
            nodesToSplit.push(halves[0])
            nodesToSplit.push(halves[1])
            return true
        }, false)
    }

    return graph
}
