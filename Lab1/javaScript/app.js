
try {
  var canvas = document.getElementById('glcanvas');
  canvas.width = 800
  canvas.height = 600

  let scene = new Scene()
  let renderer = new Renderer(canvas)

  let group = new Group()

  let triangle = new RATriangle(0.5, 0.5, new ColorRGBA(1, 0, 0, 1))
  let triangle2 = new RATriangle(0.5, 0.5, new ColorRGBA(1, 0, 0, 1))
  triangle.translate(-0.3, 0.3)


  group.add(triangle, triangle2)
  group.translate(0.2,0.2)

  // console.log(triangle)

  let circle = new Circle(0.5, new ColorRGBA(1,0,0,1))
  console.log(circle.buffer)
  
  scene.add(group, circle)
  renderer.render(scene)
} catch (e) {
  console.log(e)
}
