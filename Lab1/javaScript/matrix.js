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


class Position {
  constructor(vertices) {
    this.vertices = vertices
  }

  get buffer() {
    return this.vertices
  }

  applyMatrix(matrix) {
    const translatedVertices = [];
    for (let i = 0; i < this.vertices.length; i += 3) {
      const vertex = vec2.fromValues(this.vertices[i], this.vertices[i + 1]);
      const translatedVertex = vec2.create();
      vec2.transformMat3(translatedVertex, vertex, matrix);
      translatedVertices.push(translatedVertex[0], translatedVertex[1], 0);
    }
    this.vertices = translatedVertices
  }

  translate(vector) {
    const translationMatrix = mat3.create();
    mat3.fromTranslation(translationMatrix, vector);

    this.applyMatrix(translationMatrix)
  }

  scale(vector) {
    const scalingMatrix = mat3.create();
    mat3.fromScaling(scalingMatrix, vector);

    this.applyMatrix(scalingMatrix)
  }

  rotate(rad) {
    let rotation = mat3.create()
    mat3.fromRotation(rotation, rad)

    this.applyMatrix(rotation)
  }

  rotateAboutPoint(point, rad) {
    this.translate([-point[0], -point[1]])
    this.rotate(rad)
    this.translate([point[0], point[1]])
  }
}

