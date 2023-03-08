function blueTriangle() {
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(
    fragmentShader,
    `
void main() {
    gl_FragColor = vec4(0, 0, 1, 1);
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
  gl.drawArrays(gl.TRIANGLES, 9, 3);
  gl.drawArrays(gl.TRIANGLES, 12, 3);

  gl.drawArrays(gl.TRIANGLES, 15, 3);
  gl.drawArrays(gl.TRIANGLES, 18, 3);

  gl.drawArrays(gl.TRIANGLES, 21, 3);
  gl.drawArrays(gl.TRIANGLES, 24, 3);

  gl.drawArrays(gl.TRIANGLES, 27, 3);
  gl.drawArrays(gl.TRIANGLES, 30, 3);

  gl.drawArrays(gl.TRIANGLES, 33, 3);
  gl.drawArrays(gl.TRIANGLES, 36, 3);
}

blueTriangle();
redTriangle();
