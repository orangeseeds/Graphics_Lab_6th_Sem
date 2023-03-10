class Vertex {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toArray() {
    return [this.x, this.y]
  }

  translate(x, y) {
    this.x += x
    this.y += y
  }

  rotate(center, angle) {
    let rads = (Math.PI / 180) * angle,
      cos = Math.cos(rads),
      sin = Math.sin(rads),
      rx = this.x - center.x,
      ry = this.y - center.y
    this.x = Math.fround((cos * (rx)) + (sin * (ry)) + center.x)
    this.y = Math.fround((cos * (ry)) - (sin * (rx)) + center.y)
  }

  adjustToScale(factor) {
    this.x = this.x * factor
    this.y = this.y * factor
  }


}

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
    let v2 = new Vertex(width/2, width)
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