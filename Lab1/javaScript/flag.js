var canvas = document.querySelector("canvas");
var gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("WebGL not supported");
}

// vertexData = [...]

// create buffer
// load vertexData into buffer

// create vertex shader
// create fragment shader
// create program
// attach shaders to program

// enable vertex attributes

// draw
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `
attribute vec3 position;
void main() {
    gl_Position = vec4(position, 1);
}
`
);
gl.compileShader(vertexShader);

function getResolution() {
  alert(
    "Your screen resolution is: " +
      (window.screen.width * window.devicePixelRatio).toFixed(2) +
      "x" +
      (window.screen.height * window.devicePixelRatio).toFixed(2)
  );
}
getResolution();
