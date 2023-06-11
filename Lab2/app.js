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
  white: [1, 1, 1, 1]
}

let bla = new BufferGeometry
bla.setDrawMethod("point")
let vertices = blaLine(0, 0, 200, 200, canvas.width, canvas.height)
bla.setAttribute(vertices, vertices.length/3)
bla.setProperties({ color: colors.red })

let dda = new BufferGeometry
dda.setDrawMethod("point")
vertices = blaLine(1, 1, 60, 400, canvas.width, canvas.height)
dda.setAttribute(vertices, vertices.length/3)
dda.setProperties({ color: colors.red })

scene.add(dda)

renderer.render(scene)
