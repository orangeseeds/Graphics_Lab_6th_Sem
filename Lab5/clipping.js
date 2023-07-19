const
    INSIDE = 0, // 0000
    LEFT = 1,   // 0001
    RIGHT = 2,  // 0010
    BOTTOM = 4, // 0100
    TOP = 8     // 1000

function cohenSutherlandClipping(x1, y1, x2, y2, xMax, yMax, xMin, yMin) {
    let codeP1 = computeRegionCode(x1, y1, xMax, yMax, xMin, yMin)
    let codeP2 = computeRegionCode(x2, y2, xMax, yMax, xMin, yMin)

    let accepted = false

    while (true) {
        if ((codeP1 == 0) && (codeP2 == 0)) {
            accepted = true;
            break;
        }
        else if (codeP1 & codeP2) {
            break;
        }
        else {
            let codeOut;
            let x, y;

            if (codeP1 != 0) {
                codeOut = codeP1;
            }
            else {
                codeOut = codeP2;
            }

            if (codeOut & TOP) {
                x = Math.min(x1 + (x2 - x1) * (yMax - y1) / (y2 - y1), xMax)
                y = yMax;
            }
            else if (codeOut & BOTTOM) {
                x = Math.max(x1 + (x2 - x1) * (yMin - y1) / (y2 - y1), xMin)
                y = yMin;
            }
            else if (codeOut & RIGHT) {
                y = Math.min(y1 + (y2 - y1) * (xMax - x1) / (x2 - x1), yMax)
                x = xMax;
            }
            else if (codeOut & LEFT) {
                y = Math.max(y1 + (y2 - y1) * (xMin - x1) / (x2 - x1), yMin)
                x = xMin;
            }

            if (codeOut == codeP1) {
                x1 = x;
                y1 = y;
                codeP1 = computeRegionCode(x1, y1, xMax, yMax, xMin, yMin);
            }
            else {
                x2 = x;
                y2 = y;
                codeP2 = computeRegionCode(x2, y2, xMax, yMax, xMin, yMin);
            }
        }
    }
    // if (accepted) {
    //     console.log("line accepted!!")
    // }
    // else {
    //     console.log("line rejected!!")
    // }
    // console.log(x1, y1, x2, y2)
    return {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
    }
}

function computeRegionCode(x, y, xMax, yMax, xMin, yMin) {
    let code = INSIDE
    if (x < xMin) {
        code = code | LEFT; // |= does a bitwise or in jS
    } else if (x > xMax) {
        code = code | RIGHT;
    }

    if (y < yMin) {
        code = code | BOTTOM;
    } else if (y > yMax) {
        code = code | TOP;
    }


    return code
}


function sutherlandHodgemanClip(
    polygon,

    // Clipping edge points
    xMax, yMax,
    xMin, yMin,
) {
    let clippedPolygon = []

    let till = polygon.length / 2
    if (polygon.length == 4) {
        till = 1
    }


    for (let i = 0; i <= till; i += 2) {
        let result = cohenSutherlandClipping(
            polygon[i], polygon[i + 1],
            polygon[i + 2], polygon[i + 3],
            xMax, yMax,
            xMin, yMin
        )
        // console.log("ran")
        clippedPolygon.push(result.x1, result.y1, result.x2, result.y2)
        //
        // console.log(
        //     "x1 ", polygon[i], "y1 ", polygon[i + 1],
        //     "x2 ", polygon[i + 2], "y2 ", polygon[i + 3],
        //     "max ", xMax, yMax,
        //     "min ", xMin, yMin
        // )
        // console.log(
        //     "x1 ", result.x1, "y1 ", result.y1,
        //     "x2 ", result.x2, "y2 ", result.y2,
        // )
    }

    if (till != 1){
        let result = cohenSutherlandClipping(
            polygon[polygon.length - 2], polygon[polygon.length - 1],
            polygon[0], polygon[1],
            xMax, yMax,
            xMin, yMin
        )
        clippedPolygon.push(result.x1, result.y1, result.x2, result.y2)

        // console.log(
        //     "x1 ", polygon[polygon.length - 2], "y1 ", polygon[polygon.length - 1],
        //     "x2 ", polygon[0], "y2 ", polygon[1],
        //     "max ", xMax, yMax,
        //     "min ", xMin, yMin
        // )
        // console.log(
        //     "x1 ", result.x1, "y1 ", result.y1,
        //     "x2 ", result.x2, "y2 ", result.y2,
        // )
    }
    return clippedPolygon
}

function main() {
    let polygon = [
        100, 150,
        200, 250,
        300, 200
    ]

    let clipper = [
        150, 150,
        150, 200,
        200, 200,
        200, 150,
    ]


    console.log(sutherlandHodgemanClip(polygon, 200, 200, 150, 150))

    console.log(cohenSutherlandClipping(polygon[0], polygon[1], polygon[2], polygon[3], 200,200,150,150))
}

function homogenize(buffer){
    let homogenizedBuffer = []
    for (let i=0; i<buffer.length; i+=2){
       homogenizedBuffer.push(buffer[i], buffer[i+1], 1) 
    }
    return homogenizedBuffer
}
main()
