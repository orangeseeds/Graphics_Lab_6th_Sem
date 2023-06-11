
const vertexShaderSource = `
  precision highp float;
  attribute vec4 coordinates;

  void main(){
    gl_Position = coordinates;
    gl_PointSize = 1.0;
  }
`

const fragmentShaderSource = `
  precision mediump float;
  uniform vec4 v_Color;

  void main(){
    gl_FragColor = vec4(v_Color);
  }
`


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
  }

  setColor(color) {
    let v_Color = this.getUniformLocation("v_Color")
    this.gl.uniform4fv(v_Color, color)
  }

  delete() {
    this.gl.deleteProgram(this.program)
  }
}
