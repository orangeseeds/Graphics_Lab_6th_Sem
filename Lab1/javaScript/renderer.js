class Renderer {
  constructor(canvas) {
    this.canvas = canvas
    this.gl = canvas.getContext('webgl')

    this.shader = new Shader(this.gl, vertexShaderSource, fragmentShaderSource)
  }

  createVertexBuffer(geometry) {
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(geometry.vertices), this.gl.STATIC_DRAW)
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    return buffer
  }
  createIndexBuffer(geometry) {
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Float32Array(geometry.indices), this.gl.STATIC_DRAW)
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    return buffer
  }

  computeBuffers(geometry) {
    geometry.vertices = geometry.position.buffer
    geometry.vertexBuffer = this.createVertexBuffer(geometry)
    geometry.indexBuffer = this.createIndexBuffer(geometry)
  }

  runExtensions(geometry) {
    for (var name in geometry.extensions) {
      geometry.extensions[name]({
        geometry: geometry
      })
    }
  }

  // TODO: make the function able to add in drawingMode
  renderObject(object) {
    if (object.isGroup) {
      object.children.forEach((child) => {
        this.renderObject(child)
      })
    }
    else {
      this.runExtensions(object)
      this.computeBuffers(object)

      const shader = new Shader(this.gl, vertexShaderSource, fragmentShaderSource)
      shader.use()
      shader.setColor(object.color)

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.vertexBuffer);

      var coord = shader.getAttributeLocation("coordinates")
      this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(coord);

      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, object.indexBuffer)
      this.gl.drawArrays(this.gl.TRIANGLES, 0, object.indices.length)
    }
  }

  #renderScene() {
    this.gl.clearColor(...this.scene.color);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.viewport(0, 0, canvas.width, canvas.height)

    this.scene.objects.forEach((object) => {
      this.renderObject(object)
    })
  }

  render(scene){
    this.scene = scene
    this.#renderScene(scene)
  }
}
