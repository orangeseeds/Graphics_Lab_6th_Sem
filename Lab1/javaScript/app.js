/*
  this needs to be imported to use some matrix computations.
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix.js"></script>
*/

var canvas = document.getElementById('glcanvas');
canvas.width = 500
canvas.height = 500
let renderer = new Renderer(canvas)
let scene = new Scene()

const colors = {
  red: [0.78, 0.078, 0.235, 1],
  blue: [0, 0.219, 0.576, 1],
  white: [1, 1, 1, 1]
}

const flagShilouette = (color) => {
  let uTriangle = new RATriangleGeometry()
  uTriangle.position.scale([1, 0.7])
  let lTriangle = new RATriangleGeometry()
  lTriangle.position.translate([0, -0.2])
  let group = new Group()
  group.add(uTriangle, lTriangle)
  group.setColor(color)
  return group
}

const flagCloth = () => {
  bluePart = flagShilouette(colors.blue)
  bluePart.scale([1.2, 1.2])
  bluePart.translate([-0.016, 0.024])
  bluePart.children[0].position.translate([0, -0.04])
  redPart = flagShilouette(colors.red)

  let flagCloth = new Group()
  flagCloth.add(redPart, bluePart)
  flagCloth.scale([2.5, 2.5])
  return flagCloth
}

const cresent = () => {
  let clipMask = new CircleGeometry(0.4)
  clipMask.setProperties({ color: colors.white })
  clipMask.position.scale([1, 0.9])
  let clip = new CircleGeometry(0.4)
  clip.position.translate([0, 0.16])
  clip.setProperties({ color: colors.red })
  clip.position.scale([1, 0.9])
  let c = new Group()
  c.add(clip, clipMask)
  return c

}


function sun() {
  let sun = new Group()
  let circle = new CircleGeometry(0.1)
  circle.position.translate([0.1, 0.1])
  sun.add(circle)
  for (let i = 0; i < 8; i += 0.5) {
    let triangle = new RATriangleGeometry(0.1, 0.1)
    triangle.position.rotateAboutPoint([0.1, 0.1, 0], 135 + i * 45 * Math.PI / 180)
    sun.add(triangle)
    sun.setColor(colors.white)
  }
  return sun

}

const moon = () => {
  let c = cresent()
  let s = sun()
  s.scale([1.65, 1.65])
  s.translate([-0.16, -0.26])
  let m = new Group()
  m.add(s, c)
  m.scale([0.35, 0.35])
  m.translate([0.2, 0.18])
  return m
}

function fullFlag() {
  let flag = flagCloth()
  let sunU = sun()
  sunU.scale([0.85, 0.85])
  sunU.translate([0.12, -0.37])
  let moonD = moon()

  flagNepal = new Group()
  flagNepal.add(sunU, moonD, flag)
  return flagNepal
}

let nepalFlag = fullFlag()
nepalFlag.translate([-0.3, 0])

scene.add(nepalFlag)

renderer.render(scene)
