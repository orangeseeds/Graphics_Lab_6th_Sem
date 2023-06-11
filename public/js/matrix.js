
class Position {
    constructor(vertices) {
        this.vertices = vertices
        this.scale([1, 1])
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


    // =========================================
    // This is my implementation (Lab4)


    translate2D(x, y) {
        this.vertices = applyTransformation2D(fromTranslation2D(x, y), this.vertices)
        this.scale([1,1])
    }
    rotate2D(rad) {
        this.vertices = applyTransformation2D(fromRotation2D(rad), this.vertices)
    }
    rotateAboutPoint2D(x, y, rad) {
        this.translate2D(-x, -y)
        this.rotate2D(rad)
        this.translate2D(x, y)
    }
    scale2D(sx, sy) {
        this.vertices = applyTransformation2D(fromScaling2D(sx, sy), this.vertices)
    }
    reflectX2D() {
        this.vertices = applyTransformation2D(fromReflectionXAxis2D(), this.vertices)
    }
    reflectY2D() {
        this.vertices = applyTransformation2D(fromReflectionYAxis2D(), this.vertices)
    }
    reflectXY2D() {
        this.vertices = applyTransformation2D(fromReflectionXYAxis2D(), this.vertices)
    }
    reflectOrigin2D() {
        this.vertices = applyTransformation2D(fromReflectionOrigin2D(), this.vertices)
    }
    shearX2D(shx) {
        this.vertices = applyTransformation2D(fromShearingX2D(shx), this.vertices)
    }
    shearY2D(shy) {
        this.vertices = applyTransformation2D(fromShearingY2D(shy), this.vertices)
    }
}

const loadGLMatrix = () => {
    let scriptTag = document.createElement("script")
    scriptTag.src = "https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix.js"
    scriptTag.onload = () => {
        console.log("gl-matrix loaded!")
    }
    document.head.appendChild(scriptTag)
}


function fromRotation2D(rad) {
    return [
        Math.cos(rad), -Math.sin(rad), 0,
        Math.sin(rad), Math.cos(rad), 0,
        0, 0, 1
    ]
}
function fromScaling2D(sx, sy) {
    return [
        sx, 0, 0,
        0, sy, 0,
        0, 0, 1
    ]
}

function fromReflectionYAxis2D() {
    return [
        -1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ]
}
function fromReflectionXAxis2D() {
    return [
        1, 0, 0,
        0, -1, 0,
        0, 0, 1
    ]
}
function fromReflectionOrigin2D() {
    return [
        -1, 0, 0,
        0, -1, 0,
        0, 0, 1
    ]
}
function fromReflectionXYAxis2D() {
    return [
        0, 1, 0,
        1, 0, 0,
        0, 0, 1
    ]
}

function fromShearingX2D(shx) {
    return [
        1, shx, 0,
        0, 1, 0,
        0, 0, 1
    ]
}
function fromShearingY2D(shy) {
    return [
        1, 0, 0,
        shy, 1, 0,
        0, 0, 1
    ]
}


function fromTranslation2D(x, y) {
    return [
        1, 0, x,
        0, 1, y,
        0, 0, 1
    ]
}
function applyTransformation2D(matrix, to) {
    const transformed = [];
    for (let i = 0; i < to.length; i += 3) {
        transformed.push(matrix[0] * to[i] + matrix[1] * to[i + 1] + matrix[2] * to[i + 2])
        transformed.push(matrix[3] * to[i] + matrix[4] * to[i + 1] + matrix[5] * to[i + 2])
        transformed.push(matrix[6] * to[i] + matrix[7] * to[i + 1] + matrix[8] * to[i + 2])
    }
    return transformed
}

loadGLMatrix()



