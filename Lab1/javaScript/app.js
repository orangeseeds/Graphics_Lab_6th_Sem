
var canvas = document.getElementById('glcanvas');
canvas.width = 900
canvas.height = 800



let scene = new Scene(new ColorRGBA(1, 1, 1, 1))
let renderer = new Renderer(canvas)

let group = new Group()

let triangle = new RATriangle(0.5, 0.5, new ColorRGBA(1, 0, 0, 1))
let triangle2 = new RATriangle(0.5, 0.5, new ColorRGBA(1, 0, 0, 1))
triangle.translate(-0.3, 0.3)


group.add(triangle, triangle2)
group.translate(0.2, 0.2)

// console.log(triangle)

let circle = new Circle(0.5, new ColorRGBA(1, 0, 0, 1))
circle.scale(0.1)
circle.translate(0, 0.4)
scene.add(circle)
renderer.render(scene)
