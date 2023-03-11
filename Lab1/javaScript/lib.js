const
  GLenum_POINTS = "GLenum_POINTS",
  GLenum_LINE_STRIP = "GLenum_LINE_STRIP",
  GLenum_LINE_LOOP = "GLenum_LINE_LOOP",
  GLenum_LINES = "GLenum_LINES",
  GLenum_TRIANGLE_STRIP = "GLenum_TRIANGLE_STRIP",
  GLenum_TRIANGLE_FAN = "GLenum_TRIANGLE_FAN",
  GLenum_TRIANGLES = "GLenum_TRIANGLES"

class Renderer {
  constructor(canvas) {
    this.canvas = canvas
    this.gl = canvas.getContext('webgl')
  }
  #computeObject2D() {
    // if (this.scene.container.triangles == 0) {
    //   return
    // }

    const vertices = []
    this.scene.objects.forEach((object) => {
      vertices.push(...object.buffer)
    })


    var vertex_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
  }

  render(scene) {
    this.scene = scene
    this.#computeObject2D()

    this.gl.clearColor(...this.scene.color.asArray());
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.viewport(0, 0, canvas.width, canvas.height);

    this.index = 0
    this.scene.objects.forEach((object) => {
      this.shaderProgram = object.shader.buildAndCompile(this.gl)

      var coord = this.gl.getAttribLocation(this.shaderProgram, "coordinates");
      this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(coord);

      // console.log(object.vertices)
      this.gl.drawArrays(this.#selectDrawingMode(object.mode), this.index, object.vertices.length);
      this.index += object.vertices.length
    })
  }

  #selectDrawingMode(mode) {
    switch (mode) {
      case (GLenum_POINTS):
        return this.gl.POINTS
      case (GLenum_LINE_STRIP):
        return this.gl.LINE_STRIP
      case (GLenum_LINE_LOOP):
        return this.gl.LINE_LOOP
      case (GLenum_LINES):
        return this.gl.LINES
      case (GLenum_TRIANGLE_STRIP):
        return this.gl.TRIANGLE_STRIP
      case (GLenum_TRIANGLE_FAN):
        return this.gl.TRIANGLE_FAN
      case (GLenum_TRIANGLES):
        return this.gl.TRIANGLES
    }
  }
}

class GLObjectContainer {
  triangles = 0
}

class Scene {
  constructor(color) {
    this.objects = []
    this.container = new GLObjectContainer()
    this.color = color
  }

  add(...objects) {
    objects.forEach((obj) => {
      if (obj.children.length > 0) {
        obj.children.forEach((child) => {
          this.objects.push(child)
          this.#tallyObject2D(child)
        })
        return
      }
      this.objects.push(obj)
      this.#tallyObject2D(obj)
    })
    // console.log(this.objects)
  }

  #tallyObject2D(obj) {
    switch (obj.type) {
      case ("Triangle"):
        this.container.triangles++
    }
  }
}


class ColorRGBA {
  constructor(r, g, b, a) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  toArray() {
    return [this.r, this.g, this.b, this.a]
  }

  toText() {
    return `${this.r},${this.g},${this.b},${this.a}`
  }
}

class Shader {
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
    // console.log(this.program)
  }
  setColor(color) {
    let v_Color = this.getUniformLocation("v_Color")
    this.gl.uniform4fv(v_Color, color.toArray())
  }

  delete() {
    this.gl.deleteProgram(this.program)
  }
}
