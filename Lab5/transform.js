export function fromRotation(rad) {
    return [
        Math.cos(rad), -Math.sin(rad), 0,
        Math.sin(rad), Math.cos(rad), 0,
        0, 0, 1
    ]
}
export function fromScaling(sx, sy) {
    return [
        sx, 0, 0,
        0, sy, 0,
        0, 0, 1
    ]
}

export function fromReflectionYAxis() {
    return [
        -1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ]
}
export function fromReflectionXAxis() {
    return [
        1, 0, 0,
        0, -1, 0,
        0, 0, 1
    ]
}
export function fromReflectionOrigin() {
    return [
        -1, 0, 0,
        0, -1, 0,
        0, 0, 1
    ]
}
export function fromReflectionXYAxis() {
    return [
        0, 1, 0,
        1, 0, 0,
        0, 0, 1
    ]
}

export function fromShearingX(shx) {
    return [
        1, shx, 0,
        0, 1, 0,
        0, 0, 1
    ]
}
export function fromShearingY(shy) {
    return [
        1, 0, 0,
        shy, 1, 0,
        0, 0, 1
    ]
}

export function fromTranslation(x, y) {
    return [
        1, 0, x,
        0, 1, y,
        0, 0, 1
    ]
}
export function applyMatrix(matrix, to) {
    const transformed = [];
    for (let i = 0; i < to.length; i += 3) {
        transformed.push(matrix[0] * to[i] + matrix[1] * to[i + 1] + matrix[2] * to[i + 2])
        transformed.push(matrix[3] * to[i] + matrix[4] * to[i + 1] + matrix[5] * to[i + 2])
        transformed.push(matrix[6] * to[i] + matrix[7] * to[i + 1] + matrix[8] * to[i + 2])
    }
    return transformed
}
