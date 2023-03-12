
class BufferGeometry {
  constructor() {
    this.extensions = {}
    this.color = [0.4, 0.4, 0.4, 1]
  }

  setAttribute(vertices, itemSize) {
    this.position = new Position(vertices)
    this.indices = [...Array(itemSize).keys()]
  }

  setProperties({ color }) {
    this.color = color
  }

  // this adds new function which might be required for computations to an 
  //already existing class from the outside the class.
  addExtension(name, extension) {
    this.extensions[name] = extension
  }

  runExtensions() {
    for (var ext in this.extensions) {
      this.extensions[ext]({ geometry: this })
    }
  }
}

class CircleGeometry extends BufferGeometry {
  constructor(radius = 0.3) {
    super()

    this.setAttribute([
      0, 0, 0, // point at center of circle
      0, radius, 0 // a point at the circumference
    ], 2)

    // can access geometry from inside the injected function.
    this.addExtension("genCircumference", ({ geometry } = {}) => {
      geometry.generateCircumference()
    })
  }

  generateCircumference() {
    this.center = this.position.buffer.slice(0, 3)
    this.pointOnC = this.position.buffer.slice(3, 6)

    let point = new Position(this.pointOnC)
    let rad = 0
    for (let a = 0; a <= 360; a += 0.5) {
      rad = a * Math.PI / 180
      point.rotateAboutPoint(this.center, rad)
      this.position.vertices.push(...point.buffer)
    }
    this.indices = [...Array(this.position.buffer.length / 3).keys()]
  }
}

class RATriangleGeometry extends BufferGeometry {
  constructor(width = 0.3, height = 0.3) {
    super()
    this.setAttribute([
      0, 0, 0,
      width, 0, 0,
      0, height, 0
    ], 3)
  }
}