const generateMap = require('../lib/index').generateMap

const map = generateMap(400, 400, {
    minHeight: 25,
    stopHeight: 60,
    minWidth: 25,
    stopWidth: 60,
    ignoreSplitPercent: 10,
    ignoreStopPercent: 10
})

map.vertices.forEach(vertex => {
    const vertexId = vertex['@@vertexId']
    const degrees = map.degrees.get(vertexId)
    console.log(`vertex ${vertexId}, degrees:`, degrees)
    if (degrees <= 1) {
        console.log(`vertex ${vertexId}, width: ${vertex.size.width}, height: ${vertex.size.height}`)
    }
})
