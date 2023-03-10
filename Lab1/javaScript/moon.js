// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
function Moon() {
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(
    fragmentShader,
    `
void main() {
    gl_FragColor = vec4(1, 1, 1, 1);
}
`
  );
  gl.compileShader(fragmentShader);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const positionLocation = gl.getAttribLocation(program, `position`);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 36, 3);
  gl.drawArrays(gl.TRIANGLES, 39, 3);
  gl.drawArrays(gl.TRIANGLES, 42, 3);
  gl.drawArrays(gl.TRIANGLES, 45, 3);
}
Moon();
