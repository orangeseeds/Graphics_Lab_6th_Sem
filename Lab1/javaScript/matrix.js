class Position {
  constructor(vertices) {
    // this.matrix = mat3.fromValues(...vertices)
    this.vertices = vertices
  }

  get buffer() {
    return this.vertices
  }

  applyMatrix(matrix) {
    const translatedVertices = [];
    for (let i = 0; i < this.vertices.length; i += 3) {
      const vertex = vec2.fromValues(this.vertices[i], this.vertices[i + 1]);
      const translatedVertex = vec2.create();
      vec2.transformMat3(translatedVertex, vertex, matrix);
      translatedVertices.push(translatedVertex[0], translatedVertex[1], 0);
    }
    this.vertices = translatedVertices
  }

  translate(vector) {
    const translationMatrix = mat3.create();
    mat3.fromTranslation(translationMatrix, vector);

    this.applyMatrix(translationMatrix)
  }

  scale(vector) {
    const scalingMatrix = mat3.create();
    mat3.fromScaling(scalingMatrix, vector);

    this.applyMatrix(scalingMatrix)
  }

  rotate(rad) {
    let rotation = mat3.create()
    mat3.fromRotation(rotation, rad)

    this.applyMatrix(rotation)
  }

  rotateAboutPoint(point, rad) {
    this.translate([-point[0], -point[1]])
    this.rotate(rad)
    this.translate([point[0], point[1]])
  }
}

class BufferGeometry {
  constructor(gl, vertices, indices) {
    this.gl = gl
    this.position = new Position(vertices)
    this.indices = indices

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

  draw() {

    this.computeBuffers()
    this.shader = new GeometryShader(this.gl, vertexShaderSource, fragmentShaderSource)
    this.shader.use()

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

    var coord = this.shader.getAttributeLocation("coordinates")
    this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(coord);

    this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.viewport(0, 0, 300, 300)
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.indices.length)
  }
}


class GeometryShader {
  constructor(gl, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    this.gl = gl
    this.program = shaderProgram
    this.attributeLocations = {}
    this.uniformLocations = {}
  }

  createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    // IMPORTANT: 
    //the check is very important to know if there is any error when creating the shader.
    // usually this is the step where things go worng and go unnoticed.
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`
        Error compiling 
        ${type === gl.VERTEX_SHADER ? 'vertex' : 'fragment'} shader:`,
        gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader
  }

  getAttributeLocation(name) {
    if (!(name in this.attributeLocations)) {
      this.attributeLocations[name] = this.gl.getAttribLocation(this.program, name);
    }
    if (this.attributeLocations[name] == null) {
      console.warn(`${name} key not in gl.AttribLocations`)
    }
    return this.attributeLocations[name];
  }

  getUniformLocation(name) {
    if (!(name in this.uniformLocations)) {
      this.uniformLocations[name] = this.gl.getUniformLocation(this.program, name);
    }
    if (this.uniformLocations[name] == null) {
      console.warn(`${name} key not in gl.UniformLocations`)
    }
    return this.uniformLocations[name];
  }

  use() {
    this.gl.useProgram(this.program)
  }
  setColor(color) {
    let v_Color = this.getUniformLocation("v_Color")
    this.gl.uniform4fv(v_Color, color.toArray())
  }

  delete() {
    this.gl.deleteProgram(this.program)
  }
}

class CircleGeometry extends BufferGeometry {
  constructor(gl, center, radius) {
    const pointOnC = [center[0], center[1] + radius, 0]
    super(gl, [...center, ...pointOnC], [0, 1])
    this.radius = radius
  }

  generateCircumference() {
    this.center = this.position.buffer.slice(0,3)
    this.pointOnC = this.position.buffer.slice(3,6)
    
    let point = new Position(this.pointOnC)
    let rad = 0
    for (let a = 0; a <= 360; a += 0.5) {
      rad = a * Math.PI / 180
      point.rotateAboutPoint(this.center, rad)
      this.position.vertices.push(...point.buffer)
    }
    this.indices = [...Array(this.position.buffer.length / 3).keys()]
  }

  computeBuffers() {
    this.generateCircumference()
    this.vertices = this.position.buffer
    this.vertexBuffer = this.createVertexBuffer()
    this.indexBuffer = this.createIndexBuffer()
  }

}