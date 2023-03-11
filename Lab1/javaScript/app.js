var canvas = document.getElementById('glcanvas');

let gl = canvas.getContext('webgl')

let shader = new Shader(gl, vertexShaderSource, fragmentShaderSource)

let vertices = [
  0, 0, 0
]
let indices = [0, 1, 2]

let geometry = new CircleGeometry(gl, vertices, 0.3)
geometry.position.translate([0.2,0.2])
geometry.draw()

// ========

// let color = new ColorRGBA(1, 0, 0, 1)
// let shape = new Geometry(gl, shader, vertices, indices, color)

// shape.draw()
