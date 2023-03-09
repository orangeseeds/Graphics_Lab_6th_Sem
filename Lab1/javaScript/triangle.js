
class Vertex {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toArray() {
    return [this.x, this.y]
  }

  translate(x, y) {
    this.x += x
    this.y += y
  }

  rotate(center, angle) {
    let rads = (Math.PI / 180) * angle
    cos = Math.cos(rads)
    sin = Math.sin(rads)
    rx = x - center.x
    ry = y - center.y
    this.x =  (cos * (rx)) + (sin * (ry)) + center.x
    this.y = (cos * (ry)) - (sin * (rx)) + center.y
  }

  scaleBy(xFactor,yFactor){
    this.x = this.x * xFactor
    this.y = this.y * yFactor
  }
}

class Triangle {

  constructor(v1, v2, v3) {
    this.v1 = v1
    this.v2 = v2
    this.v3 = v3
  }

  get buffer() {
    return [
      ...this.v1.toArray(),
      ...this.v2.toArray(),
      ...this.v3.toArray()
    ]
  }

  translate(x, y) {
    this.v1.translate(x, y)
    this.v2.translate(x, y)
    this.v3.translate(x, y)
  }

  scale(xFactor, yFactor){
    this.v1.scaleBy(xFactor, yFactor)
    this.v2.scaleBy(xFactor, yFactor)
    this.v3.scaleBy(xFactor, yFactor)
  }
}

let triangle = new Triangle(
  new Vertex(0, 3),
  new Vertex(0, 6),
  new Vertex(5, 3)
)

console.log(triangle.buffer)