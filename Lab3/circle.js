function midPointCircle(radius, xc, yc, w, h) {
    let vertices = [];
    let x = 0;
    let y = radius;
    let p = 1 - radius;

    while (x <= y) {
        vertices.push(normalize(xc + x, w));
        vertices.push(normalize(yc + y, h));
        vertices.push(1);
        vertices.push(normalize(xc + y, w));
        vertices.push(normalize(yc + x, h));
        vertices.push(1);
        vertices.push(normalize(xc - x, w));
        vertices.push(normalize(yc + y, h));
        vertices.push(1);
        vertices.push(normalize(xc - y, w));
        vertices.push(normalize(yc + x, h));
        vertices.push(1);
        vertices.push(normalize(xc + x, w));
        vertices.push(normalize(yc - y, h));
        vertices.push(1);
        vertices.push(normalize(xc + y, w));
        vertices.push(normalize(yc - x, h));
        vertices.push(1);
        vertices.push(normalize(xc - x, w));
        vertices.push(normalize(yc - y, h));
        vertices.push(1);
        vertices.push(normalize(xc - y, w));
        vertices.push(normalize(yc - x, h));
        vertices.push(1);
        if (p < 0) {
            x++;
            p += 2 * x + 1;
        } else {
            x++;
            y--;
            p += 2 * x - 2 * y + 1;
        }
    }
    return vertices
}

function midPointEllipse(a, b, xc, yc, w, h) {
    let vertices = [];

    let x = 0;
    let y = b;
    let p = b * b - a * a * b + (a * a) / 4;
    let dx = 2 * b * b * x;
    let dy = 2 * a * a * y;

    while (dx < dy) {
        vertices.push(normalize(xc + x, w));
        vertices.push(normalize(yc + y, h));
        vertices.push(1);
        vertices.push(normalize(xc - x, w));
        vertices.push(normalize(yc + y, h));
        vertices.push(1);
        vertices.push(normalize(xc + x, w));
        vertices.push(normalize(yc - y, h));
        vertices.push(1);
        vertices.push(normalize(xc - x, w));
        vertices.push(normalize(yc - y, h));
        vertices.push(1);

        if (p < 0) {
            x++;
            dx += 2 * b * b;
            p += dx + b * b;
        } else {
            x++;
            y--;
            dx += 2 * b * b;
            dy -= 2 * a * a;
            p += dx - dy + b * b;
        }
    }

    p = b * b * (x + 0.5) * (x + 0.5) + a * a * (y - 1) * (y - 1) - a * a * b * b;

    while (y >= 0) {
        vertices.push(normalize(xc + x, w));
        vertices.push(normalize(yc + y, h));
        vertices.push(1);
        vertices.push(normalize(xc - x, w));
        vertices.push(normalize(yc + y, h));
        vertices.push(1);
        vertices.push(normalize(xc + x, w));
        vertices.push(normalize(yc - y, h));
        vertices.push(1);
        vertices.push(normalize(xc - x, w));
        vertices.push(normalize(yc - y, h));
        vertices.push(1);

        if (p > 0) {
            y--;
            dy -= 2 * a * a;
            p += a * a - dy;
        } else {
            x++;
            y--;
            dx += 2 * b * b;
            dy -= 2 * a * a;
            p += dx - dy + a * a;
        }
    }
return vertices
}


function normalize(pos, axis) {
    let normalised = pos / axis;
    return normalised;
}
