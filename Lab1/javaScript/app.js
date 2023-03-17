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
  white: [1, 1, 1, 1],
  kuLogoBlue: [25/255, 50/255, 80/255, 1],
}

function kuLogoLetter() {

  let kVert = new RectangleGeometry(0.06, 0.425)
  kVert.position.translate([-0.2, 0.07])

  let kAngle = new RectangleGeometry()
  kAngle.position.scale([0.2, 1])
  kAngle.position.translate([-.05, 0.1])

  let kAngle2 = new RectangleGeometry(0.06, 0.25)
  kAngle2.position.rotate(-3 * Math.PI / 2)
  kAngle2.position.translate([-0.05, 0.1])

  let kAngle3 = new RectangleGeometry(0.06, 0.25)
  kAngle3.position.translate([-0.3, 0.15])

  let kLetter = new Group()
  kLetter.add(kAngle, kAngle2, kAngle3)

  kLetter.rotate(-Math.PI / 4)
  kLetter.add(kVert)
  kLetter.setColor(colors.kuLogoBlue) // 25,50,80,1

  return kLetter

}

scene.add(kuLogoLetter())

renderer.render(scene)
