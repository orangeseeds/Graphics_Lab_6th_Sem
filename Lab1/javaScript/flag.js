document.getElementById("resolution").innerHTML =
  "Your screen resolution is: " +
  (window.screen.width * window.devicePixelRatio).toFixed(2) +
  "x" +
  (window.screen.height * window.devicePixelRatio).toFixed(2);

var canvas = document.querySelector("canvas");
var gl = canvas.getContext("webgl");
if (!gl) {
  throw new Error("WebGL not supported");
}
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(
  vertexShader,
  `attribute vec3 position;void main() {gl_Position = vec4(position, 1);}`
);
gl.compileShader(vertexShader);
function Triangles(color, start, end) {
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, `${color}`);
  gl.compileShader(fragmentShader);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);
  for (let i = start; i <= end; i += 3) {
    gl.drawArrays(gl.TRIANGLES, i, 3);
  }
}
Triangles(`void main() {gl_FragColor = vec4(0, 0, 1, 1);}`, 6, 9); //Blue
Triangles(`void main() {gl_FragColor = vec4(1, 0, 0, 1);}`, 0, 3); //Red
Triangles(`void main() {gl_FragColor = vec4(1, 1, 1, 1);}`, 36, 45); //Moon
Triangles(`void main() {gl_FragColor = vec4(1, 1, 1, 1);}`, 12, 33); //Sun
