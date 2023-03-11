const vertexShaderSource = `
  precision highp float;
  attribute vec4 coordinates;

  void main(){
    gl_Position = coordinates;
  }
`
const fragmentShaderSource = `
  precision mediump float;
  uniform vec4 v_Color;

  void main(){
    gl_FragColor = vec4(v_Color);
  }
`
const scaleVertexShaderSource = `
  precision highp float;
  attribute vec4 coordinates; 
  uniform mat4 u_xformMatrix;
  
  void main() {
         gl_Position = u_xformMatrix * coordinates;
  }
`
const rotateVertexShaderSource = `
  attribute vec3 position;
  uniform mat4 Pmatrix;
  uniform mat4 Vmatrix;
  uniform mat4 Mmatrix;
  attribute vec3 color;
  varying vec3 vColor;

  void main { 
     gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);
     vColor = color;
  }
`
