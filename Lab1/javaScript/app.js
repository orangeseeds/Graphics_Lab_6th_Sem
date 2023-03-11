/*
  this needs to be imported to use some matrix computations.
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix.js"></script>
*/


var canvas = document.getElementById('glcanvas');

let upperTriangle = new RATriangleGeometry()
let lowerTriangle = new RATriangleGeometry()
lowerTriangle.position.translate([0, -0.2])

let scene = new Scene()
scene.add(upperTriangle, lowerTriangle)

let renderer = new Renderer(canvas)
renderer.render(scene)
