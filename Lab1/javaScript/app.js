var canvas = document.getElementById('glcanvas');

let gl = canvas.getContext('webgl')

let shader = new Shader(gl, vertexShaderSource, fragmentShaderSource)

let vertices = [
  0, 0, 0,
  0, 0.5, 0,
  0.5, 0, 0
]
let indices = [0, 1, 2]

let geometry = new BufferGeometry(gl, vertices, indices)
let circle = new CircleGeometry(gl, [0,0,0], 0.2)

let group = new Group()
group.add(geometry,circle)

let group1 = new Group()
group1.add(group)


let renderer = new Renderer(canvas)
renderer.renderScene(group1)
// geometry.draw()

// circle.draw()

// ========

// let color = new ColorRGBA(1, 0, 0, 1)
// let shape = new Geometry(gl, shader, vertices, indices, color)

// shape.draw()
