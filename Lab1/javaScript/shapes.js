
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
    let rads = (Math.PI / 180) * angle,
      cos = Math.cos(rads),
      sin = Math.sin(rads),
      rx = this.x - center.x,
      ry = this.y - center.y
    this.x = Math.fround((cos * (rx)) + (sin * (ry)) + center.x)
    this.y = Math.fround((cos * (ry)) - (sin * (rx)) + center.y)
  }

  scaleBy(xFactor, yFactor) {
    this.x = this.x * xFactor
    this.y = this.y * yFactor
  }
}

class Triangle { 
  constructor(v1, v2, v3, shader) {
    this.v1 = v1
    this.v2 = v2
    this.v3 = v3
    this.shader = shader
  }

  get buffer() {
    return [
      ...this.v1.toArray(), 0,
      ...this.v2.toArray(), 0,
      ...this.v3.toArray(), 0
    ]
  }

  translate(x, y) {
    this.v1.translate(x, y)
    this.v2.translate(x, y)
    this.v3.translate(x, y)
  }

  scale(xFactor, yFactor) {
    this.v1.scaleBy(xFactor, yFactor)
    this.v2.scaleBy(xFactor, yFactor)
    this.v3.scaleBy(xFactor, yFactor)
  }

  rotate(center, angle) {
    this.v1.rotate(center, angle)
    this.v2.rotate(center, angle)
    this.v3.rotate(center, angle)
  }
}

class Circle {
  constructor(center, radius) {
    this.center = center
    this.radius = radius
  }

  translate(x, y) {
    this.center.translate(x, y)
  }

  scale(factor) {
    this.radius = factor * this.radius
  }

}



/*
class ColorRGBA {
  constructor(r, g, b, a) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  toArray() {
    return [this.r, this.g, this.b, this.a]
  }

  toText(){
    return `${this.r},${this.g},${this.b},${this.a}`
  }
}

class Shader {
  constructor(color){    
    this.color = color
  }
}

*/