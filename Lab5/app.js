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

let circle = new BufferGeometry
circle.setDrawMethod("point")
let vertices = midPointCircle(100, 0, 0, canvas.width, canvas.height)
circle.setAttribute(vertices, vertices.length / 3)
circle.setProperties({ color: colors.red })

circle.position.translate2D(0.2,0.3)

scene.add(circle)


renderer.render(scene)
