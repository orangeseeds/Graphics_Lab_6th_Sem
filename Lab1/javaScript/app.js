
var canvas = document.getElementById('glcanvas');
canvas.width = 800
canvas.height = 600

let scene = new Scene()
let renderer = new Renderer(canvas)

let triangle1 = new Triangle(
  new Vertex(-0.5, 0.5),
  new Vertex(-0.5, -0.5),
  new Vertex(0.5, -0.5)
)

let triangle2 = new Triangle(
  new Vertex(-0.5, 0.5),
  new Vertex(-0.5, -0.5),
  new Vertex(0.5, -0.5)
)

triangle1.scale(0.5,0.5)
triangle2.scale(0.5,0.5)

triangle2.translate(0,0.35)


// triangle.rotate(
//   new Vertex(-0.5,-0.5),
//   120
// )

scene.add(triangle1, triangle2)
renderer.render(scene)