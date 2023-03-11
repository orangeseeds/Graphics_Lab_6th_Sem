
class Object2D {
  type = "Object2D"
  mode = ""
  constructor(shader, ...vertices) {
    this.shader = shader
    this.vertices = []
    this.children = []
    vertices.forEach((vertex) => {
      this.vertices.push(vertex)
    })
  }

  get buffer() {
    let buffer = []
    this.vertices.forEach((vertex) => {
      buffer.push(...vertex.toArray(), 0)
    })
    return buffer
  }

  translate(x, y) {
    this.vertices.forEach((vertex) => {
      vertex.translate(x, y)
    })
  }

  scale(factor) {
    this.vertices.forEach((vertex) => {
      vertex.adjustToScale(factor)
    })
  }

  rotate(center, angle) {
    this.vertices.forEach((vertex) => {
      vertex.rotate(center, angle)
    })
  }

  add(...objects) {
    objects.forEach((obj) => {
      this.vertices.push(...obj.vertices)
    })
    this.children.push(...objects)
  }
}

class Group extends Object2D {
  constructor() {
    super()
    this.type = "Group"
  }
  scale(factor) {
    this.children.forEach((child) => {
      child.scale(factor)
    })
  }
}

class Triangle extends Object2D {
  constructor({ v1, v2, v3 }, shader) {
    super(shader, v1, v2, v3)
    this.type = "Triangle"
    this.mode = GLenum_TRIANGLES
  }
}

class RATriangle extends Triangle {
  constructor(width, height, color) {
    let v1 = new Vertex(0, 0)
    let v2 = new Vertex(0, height)
    let v3 = new Vertex(width, 0)

    super({ v1, v2, v3 },
      new Shader(
        color
      )
    )
  }
}
class EQTriangle extends Triangle {
  constructor(width, color) {
    let v1 = new Vertex(0, 0)
    let v2 = new Vertex(width / 2, width)
    let v3 = new Vertex(width, 0)

    super({ v1, v2, v3 },
      new Shader(
        color
      )
    )
  }
}

class Circle extends Object2D {
  constructor(radius, color) {
    let center = new Vertex(0, 0)
    let point = new Vertex(
      center.x,
      center.y + radius
    )
    super(
      new Shader(color),
      center, point
    )
    this.type = "Circle"
    this.mode = GLenum_TRIANGLE_FAN
    this.center = center
    this.point = point
  }

  scale(factor) {
    let radius = this.point.y - this.center.y
    this.point.y = this.center.y + radius * factor
  }

  get buffer() {
    let angle = 10
    let center = this.vertices[0]

    while (angle <= 360) {
      let nextPoint = Object.assign(new Vertex(), this.vertices[1])
      nextPoint.rotate(center, angle)
      angle += 10
      this.vertices.push(nextPoint)
    }
    let buffer = []
    this.vertices.forEach((vertex) => {
      buffer.push(...vertex.toArray(), 0)
    })
    return buffer
  }
}




// ===============================================================

class Geometry {
  constructor(gl, shader, vertices, indices) {
    this.gl = gl
    this.shader = shader
    this.vertices = vertices
    this.indices = indices
    this.color = color

    this.vertexBuffer = this.createVertexBuffer()
    this.indexBuffer = this.createIndexBuffer()
  }
  createVertexBuffer() {
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW)
    this.gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer
  }
  createIndexBuffer() {
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Float32Array(this.indices), this.gl.STATIC_DRAW)
    return buffer
  }


  draw() {
    this.scaleX = 1
    this.scaleY = 1

    // this.shader = new Shader(this.gl, scaleVertexShaderSource, fragmentShaderSource)

    this.shader.use()

    const xformMatrix = new Float32Array([
      this.scaleX, 0.0, 0.0, 0.0,
      0.0, this.scaleY, 0.0, 0.0,
      0.0, 0.0, 1, 0.0,
      0.0, 0.0, 0.0, 1
    ])

    var u_xformMatrix = this.shader.getUniformLocation('u_xformMatrix')
    this.gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);


    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer)
    console.log(this.vertexBuffer)

    this.coordinatesVar = this.shader.getAttributeLocation('coordinates')
    this.gl.vertexAttribPointer(this.coordinatesVar, 3, this.gl.FLOAT, false, 0, 0)
    // this.shader.setColor(this.color)

    this.gl.enableVertexAttribArray(this.coordinatesVar)


    this.gl.clearColor(0.9, 0.9, 0.9, 1)
    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.gl.viewport(0, 0, 300, 300)

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    console.log(this.vertexBuffer)
    this.gl.drawArrays(gl.TRIANGLES, 0, this.indices.length)
    // this.gl.drawElements(
    //   this.gl.TRIANGLES, 
    //   this.indices.length, 
    //   this.gl.UNSIGNED_SHORT, 
    //   0
    // )
  }
}

// =========================================================
