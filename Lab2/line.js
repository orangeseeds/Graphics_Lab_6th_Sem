function blaLine(x1, y1, x2, y2, width, height) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let m = dy / dx;

    let x = x1;
    let y = y1;

    let points = [];
    points.push(normalise(x, width), normalise(y, height), 1);

    if (m >= 1) {
        let p = 2 * dx - dy;

        for (let i = 0; i < dy; i++) {
            if (p < 0) {
                p += 2 * dx;
            } else {
                p += 2 * (dx - dy);
                x += (x2 > x1) ? 1 : -1;
            }

            y += (y2 > y1) ? 1 : -1;
            points.push(normalise(x, width), normalise(y, height), 1);
        }
    } else {
        let p = 2 * dy - dx;

        for (let i = 0; i < dx; i++) {
            if (p < 0) {
                p += 2 * dy;
            } else {
                p += 2 * (dy - dx);
                y += (y2 > y1) ? 1 : -1;
            }

            x += (x2 > x1) ? 1 : -1;
            points.push(normalise(x, width), normalise(y, height), 1);
        }
    }

    return points;
}

function ddaLine(x1, y1, x2, y2, width, height) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)) {
        var steps = Math.abs(dx);
    } else {
        var steps = Math.abs(dy);
    }

    let x_inc = dx / steps;
    let y_inc = dy / steps;

    let x = x1;
    let y = y1;

    let points = [];

    for (let i = 0; i <= steps; i++) {
        points.push(normalise(Math.round(x), width), normalise(Math.round(y), height), 1);
        x += x_inc;
        y += y_inc;
    }

    return points;
}

function normalise(pos, axis) {
    let normalised = pos / axis;
    return normalised;
}


