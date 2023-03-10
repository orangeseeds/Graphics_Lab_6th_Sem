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
    this.ctx = canvas.getContext('webgl')
  }
  #computeObject2D() {
    // if (this.scene.container.triangles == 0) {
    //   return
    // }

    const vertices = []
    this.scene.objects.forEach((object) => {
      vertices.push(...object.buffer)
    })


    var vertex_buffer = this.ctx.createBuffer();
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, vertex_buffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(vertices), this.ctx.STATIC_DRAW);
  }

  render(scene) {
    this.scene = scene
    this.#computeObject2D()

    this.ctx.clearColor(0.5, 0.5, 0.5, 0.9);
    this.ctx.enable(this.ctx.DEPTH_TEST);
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
    this.ctx.viewport(0, 0, canvas.width, canvas.height);

    this.index = 0
    this.scene.objects.forEach((object) => {
      this.shaderProgram = object.shader.buildAndCompile(this.ctx)

      var coord = this.ctx.getAttribLocation(this.shaderProgram, "coordinates");
      this.ctx.vertexAttribPointer(coord, 3, this.ctx.FLOAT, false, 0, 0);
      this.ctx.enableVertexAttribArray(coord);

      this.ctx.drawArrays(this.#selectDrawingMode(object.mode), this.index, object.vertices.length);
      this.index += object.vertices.length
    })
  }

  #selectDrawingMode(mode) {
    switch (mode) {
      case (GLenum_POINTS):
        return this.ctx.POINTS
      case (GLenum_LINE_STRIP):
        return this.ctx.LINE_STRIP
      case (GLenum_LINE_LOOP):
        return this.ctx.LINE_LOOP
      case (GLenum_LINES):
        return this.ctx.LINES
      case (GLenum_TRIANGLE_STRIP):
        return this.ctx.TRIANGLE_STRIP
      case (GLenum_TRIANGLE_FAN):
        return this.ctx.TRIANGLE_FAN
      case (GLenum_TRIANGLES):
        return this.ctx.TRIANGLES
    }
  }
}

class GLObjectContainer {
  triangles = 0
}

class Scene {
  constructor() {
    this.objects = []
    this.container = new GLObjectContainer()
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
  constructor(color) {
    this.color = color
  }

  buildAndCompile(ctx) {
    let vertCode =
      'attribute vec3 coordinates;' +

      'void main(void) {' +
      ' gl_Position = vec4(coordinates, 1.0);' +
      '}';

    let fragCode =
      'void main(void) {' +
      ' gl_FragColor = vec4(' + this.color.toText() + ');' +
      '}';

    let vertShader = ctx.createShader(ctx.VERTEX_SHADER);
    ctx.shaderSource(vertShader, vertCode);
    ctx.compileShader(vertShader);

    var fragShader = ctx.createShader(ctx.FRAGMENT_SHADER);
    ctx.shaderSource(fragShader, fragCode);
    ctx.compileShader(fragShader);

    let shaderProgram = ctx.createProgram();
    ctx.attachShader(shaderProgram, vertShader);
    ctx.attachShader(shaderProgram, fragShader);
    ctx.linkProgram(shaderProgram);
    ctx.useProgram(shaderProgram);
    return shaderProgram
  }
}
