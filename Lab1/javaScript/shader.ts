class Shader {
  gl: WebGLRenderingContext
  program: WebGLProgram
  colorUniformLocation: WebGLUniformLocation
  uniformLocations: Map<string, WebGLUniformLocation>
  attributeLocations: Map<string, number>

  constructor(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)!
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)!

    const shaderProgram = gl.createProgram()!
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    this.gl = gl
    this.program = shaderProgram
    this.colorUniformLocation = [1, 0, 0, 1]
    this.attributeLocations = new Map<string,number>
    this.uniformLocations = new Map<string, WebGLUniformLocation>
  }

  createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type)!
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Error compiling ${type === gl.VERTEX_SHADER ? 'vertex' : 'fragment'} shader:`, gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader
  }

  getAttributeLocation(name:string) {
    if (!(name in this.attributeLocations)) {
      this.attributeLocations[name] = this.gl.getAttribLocation(this.program, name);
    }
    return this.attributeLocations[name];
  }


  getUniformLocation(name: string) {
    if (!(name in this.uniformLocations)) {
      this.uniformLocations[name] = this.gl.getUniformLocation(this.program, name);
    }
    return this.uniformLocations[name];
  }

  use() {
    this.gl.useProgram(this.program)
  }

  setColor(color: Float32List) {
    this.gl.uniform4fv(this.colorUniformLocation, color);
  }

  delete() {
    this.gl.deleteProgram(this.program)
  }
}