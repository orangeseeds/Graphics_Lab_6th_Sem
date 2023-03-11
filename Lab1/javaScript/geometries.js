
class BufferGeometry {
  constructor(gl, vertices, indices) {
    this.gl = gl
    this.position = new Position(vertices)
    this.indices = indices
    this.extensions = {}
  }

  createVertexBuffer() {
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    return buffer
  }
  createIndexBuffer() {
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Float32Array(this.indices), this.gl.STATIC_DRAW)
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    return buffer
  }

  computeBuffers() {
    this.vertices = this.position.buffer
    this.vertexBuffer = this.createVertexBuffer()
    this.indexBuffer = this.createIndexBuffer()
  }

  addExtension(name, extension) {
    this.extensions[name] = extension
  }

  runExtensions() {
    for (var ext in this.extensions) {
      this.extensions[ext]({geometry:this})
    }
  }

  draw() {
    // extension()
    this.runExtensions()
    this.computeBuffers()
    this.shader = new Shader(this.gl, vertexShaderSource, fragmentShaderSource)
    this.shader.use()
    this.shader.setColor([1, 0, 0, 1])

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

    var coord = this.shader.getAttributeLocation("coordinates")
    this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(coord);

    // this.gl.clearColor(0.8, 0.8, 0.8, 1);
    // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    this.gl.enable(this.gl.DEPTH_TEST);
    // this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.viewport(0, 0, 300, 300)
    // this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.indices.length)
  }
}




class CircleGeometry extends BufferGeometry {
  constructor(gl, center, radius) {
    const pointOnC = [center[0], center[1] + radius, 0]
    super(gl, [...center, ...pointOnC], [0, 1])
    this.radius = radius

    // can access geometry,render from inside the injected function.
    this.addExtension("genCircumference", ({geometry}={}) => {
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