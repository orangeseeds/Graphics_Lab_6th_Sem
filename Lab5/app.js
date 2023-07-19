/*
  this needs to be imported to use some matrix computations.
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix.js"></script>
*/


var canvas = document.getElementById('glcanvas');
let renderer = new Renderer(canvas)
let scene = new Scene()

const colors = {
    red: [0.78, 0.078, 0.235, 1],
    blue: [0, 0.219, 0.576, 1],
    white: [1, 1, 1, 1],
    green: [0, 0.8, 0, 1],
    black: [0, 0, 0, 1]
}


function suntherlandHodgeman() {

    let polygonVert = [
        0.2, 0.6,
        0.6, 0.8,
        0.4, 0.1,
    ]

    let clipperVert = [
        0.25, 0.25,
        0.25, 0.75,
        0.75, 0.75,
        0.75, 0.25,
    ]
    let unclipped = new BufferGeometry
    let unclippedVert = homogenize(polygonVert)
    unclipped.setAttribute(unclippedVert, unclippedVert.length / 3)
    unclipped.setProperties({ color: colors.red })
    unclipped.setDrawMethod("line")

    let polygon = new BufferGeometry
    let clipper = new BufferGeometry
    polygon.setDrawMethod("line")

    polygonVert = sutherlandHodgemanClip(polygonVert, 0.75, 0.75, 0.25, 0.25)
    polygonVert = homogenize(polygonVert)
    polygon.setAttribute(polygonVert, polygonVert.length / 3)
    polygon.setProperties({ color: colors.green })

    clipperVert = homogenize(clipperVert)
    clipper.setAttribute(clipperVert, clipperVert.length / 3)
    clipper.setProperties({ color: colors.blue })
    clipper.setDrawMethod("line")

    polygon.position.scale2D(2, 2)
    clipper.position.scale2D(2, 2)
    unclipped.position.scale2D(2, 2)


    polygon.position.translate([-0.9, -0.9])
    clipper.position.translate([-0.9, -0.9])
    unclipped.position.translate([-0.9, -0.9])

    scene.add(polygon, clipper, unclipped)


    renderer.render(scene)
}

function cohenSutherland() {
    let polygonVert = [
        0.2, 0.6,
        0.6, 0.8,
    ]

    let clipperVert = [
        0.25, 0.25,
        0.25, 0.75,
        0.75, 0.75,
        0.75, 0.25,
    ]
    let unclipped = new BufferGeometry
    let unclippedVert = homogenize(polygonVert)
    unclipped.setAttribute(unclippedVert, unclippedVert.length / 3)
    unclipped.setProperties({ color: colors.red })
    unclipped.setDrawMethod("line")

    let polygon = new BufferGeometry
    let clipper = new BufferGeometry
    polygon.setDrawMethod("line")

    let clipped = cohenSutherlandClipping(
        polygonVert[0], polygonVert[1], 
        polygonVert[2], polygonVert[3], 
        0.75, 0.75, 0.25, 0.25
    )
    polygonVert = [clipped.x1, clipped.y1, clipped.x2, clipped.y2]

    polygonVert = homogenize(polygonVert)
    polygon.setAttribute(polygonVert, polygonVert.length / 3)
    polygon.setProperties({ color: colors.green })

    clipperVert = homogenize(clipperVert)
    clipper.setAttribute(clipperVert, clipperVert.length / 3)
    clipper.setProperties({ color: colors.blue })
    clipper.setDrawMethod("line")

    polygon.position.scale2D(2, 2)
    clipper.position.scale2D(2, 2)
    unclipped.position.scale2D(2, 2)


    polygon.position.translate([-0.9, -0.9])
    clipper.position.translate([-0.9, -0.9])
    unclipped.position.translate([-0.9, -0.9])

    scene.add(polygon, clipper, unclipped)


    renderer.render(scene)
}

// suntherlandHodgeman()
cohenSutherland()

