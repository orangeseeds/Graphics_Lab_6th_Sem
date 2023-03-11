
class Geometry {
  gl: WebGLRenderingContext
  shader: Shader
  vertices: Float32List
  indices: Float32List
  vertexBuffer: WebGLBuffer
  indexBuffer: WebGLBuffer
  color: Float32List

  constructor(gl: WebGLRenderingContext, shader: Shader, vertices: Float32List, indices: Float32List, color: Float32List) {
    this.gl = gl
    this.shader = shader
    this.vertices = vertices
    this.indices = indices
    this.color = color

    this.vertexBuffer = this.createVertexBuffer()
    this.indexBuffer = this.createIndexBuffer()
  }

  createVertexBuffer(): WebGLBuffer {
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.DYNAMIC_DRAW)
    return buffer!
  }
  createIndexBuffer(): WebGLBuffer {
    const buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer)
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Float32Array(this.indices), this.gl.STATIC_DRAW)
    return buffer!
  }
  translate() { }
  scale() {
  }
  rotate() { }
  draw() {
    this.shader.setColor(this.color)
    this.shader.use()

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer)
    
    const positionAttribLoc = this.shader.getAttributeLocation('aPosition');
    this.gl.enableVertexAttribArray(positionAttribLoc);
    this.gl.vertexAttribPointer(positionAttribLoc, 3, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
  }
}

// var canvas  = document.getElementById('glcanvas')
// canvas.width = 900
// canvas.height = 800

