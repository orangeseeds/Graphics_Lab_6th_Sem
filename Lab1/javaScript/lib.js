class Renderer {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('webgl')
  }

  // buildAndCompileShaders(shader) {
  //   let vertCode =
  //     'attribute vec3 coordinates;' +

  //     'void main(void) {' +
  //     ' gl_Position = vec4(coordinates, 1.0);' +
  //     '}';

  //   let fragCode =
  //     'void main(void) {' +
  //     ' gl_FragColor = vec4(' + shader.color.toText() + ');' +
  //     '}';

  //   let vertShader = this.ctx.createShader(this.ctx.VERTEX_SHADER);
  //   this.ctx.shaderSource(vertShader, vertCode);
  //   this.ctx.compileShader(vertShader);

  //   var fragShader = this.ctx.createShader(this.ctx.FRAGMENT_SHADER);
  //   this.ctx.shaderSource(fragShader, fragCode);
  //   this.ctx.compileShader(fragShader);

  //   var shaderProgram = this.ctx.createProgram();
  //   this.ctx.attachShader(shaderProgram, vertShader);
  //   this.ctx.attachShader(shaderProgram, fragShader);
  //   this.ctx.linkProgram(shaderProgram);
  //   this.ctx.useProgram(shaderProgram);
  //   this.shaderProgram = shaderProgram
  // }

  #computeTriangles() {
    if (this.scene.container.triangles == 0) {
      return
    }

    // let indices = [...Array(3 * this.scene.container.triangles).keys()]

    const vertices = []
    this.scene.objects.forEach((object) => {
      // if (object instanceof Triangle) {
      //   console.log(object.buffer)
        vertices.push(...object.buffer)
      // }
    })


    var vertex_buffer = this.ctx.createBuffer();
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, vertex_buffer);
    this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(vertices), this.ctx.STATIC_DRAW);
    // this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, null);

    // var Index_Buffer = this.ctx.createBuffer();
    // this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    // this.ctx.bufferData(this.ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.ctx.STATIC_DRAW);
    // this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, null);
    // this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, vertex_buffer);
    // this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, Index_Buffer);
  }

  render(scene) {
    this.scene = scene

    // this.buildAndCompileShaders(
    //   new Shader(
    //     new ColorRGBA(1, 0, 0, 1)
    //   )
    // )
    // this.buildAndCompileShaders(
    //   new Shader(
    //     new ColorRGBA(1, 2, 0, 1)
    //   )
    // )

    this.#computeTriangles()

    this.ctx.clearColor(0.5, 0.5, 0.5, 0.9);
    this.ctx.enable(this.ctx.DEPTH_TEST);
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
    this.ctx.viewport(0, 0, canvas.width, canvas.height);

    this.scene.objects.forEach((object) => {
    this.shaderProgram = object.shader.buildAndCompile(this.ctx)

    var coord = this.ctx.getAttribLocation(this.shaderProgram, "coordinates");
    this.ctx.vertexAttribPointer(coord, 3, this.ctx.FLOAT, false, 0, 0);
    this.ctx.enableVertexAttribArray(coord);

      
    this.ctx.drawArrays(this.ctx.TRIANGLES, 0, 3);
    })
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
      if (obj instanceof Triangle) {
        this.container.triangles++
        this.objects.push(obj)
      }
    })
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

    let shaderProgram= ctx.createProgram();
    ctx.attachShader(shaderProgram, vertShader);
    ctx.attachShader(shaderProgram, fragShader);
    ctx.linkProgram(shaderProgram);
    ctx.useProgram(shaderProgram);
    return shaderProgram
  }
}
