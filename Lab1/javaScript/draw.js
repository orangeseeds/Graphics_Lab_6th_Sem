// Vertex shader program
const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `
const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;


function main(){
  const canvas = document.querySelector("#canvas")
  const gl = canvas.getContext("webgl")

if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    )
    return
  }

  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  
}