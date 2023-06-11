class Scene {
  constructor() {
    this.objects = []
    this.isScene = true
    this.color = [0.8, 0.8, 0.8, 1]
  }

  add(...objects) {
    this.objects.push(...objects)
  }

  setBackgroundColor(color) {
    this.color = color
  }
}

class Group {
  constructor() {
    this.children = []
    this.isGroup = true
  }

  add(...children) {
    this.children.push(...children)
  }

  #translate(object, vector) {
    if (object.isGroup) {
      object.children.forEach((c) => {
        object.#translate(c, vector)
      })
    }
    else {
      object.position.translate(vector)
    }
  }

  translate(vector) {
    this.children.forEach((child) => {
      this.#translate(child, vector)
    })
  }

  #rotate(object, rad) {
    if (object.isGroup) {
      object.children.forEach((c) => {
        object.#rotate(c, rad)
      })
    }
    else {
      object.position.rotate(rad)
    }
  }

  rotate(rad) {
    this.children.forEach((child) => {
      this.#rotate(child, rad)
    })
  }

  #scale(object, vector) {
    if (object.isGroup) {
      object.children.forEach((c) => {
        object.#scale(c, vector)
      })
    }
    else {
      object.position.scale(vector)
    }
  }

  scale(vector) {
    this.children.forEach((child) => {
      this.#scale(child, vector)
    })
  }


  #setColor(object, color) {
    if (object.isGroup) {
      object.children.forEach((c) => {
        object.#setColor(c, color)
      })
    }
    else {
      object.setProperties({ color: color })
    }
  }

  setColor(color) {
    this.children.forEach((child) => {
      this.#setColor(child, color)
    })
  }
  // rotate(){}
  // scale(){}
}
