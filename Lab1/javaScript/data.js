//RED PART
let t1 = [...[0, 0, 0], ...[0, 3.75, 0], ...[5, 0, 0]];
let t2 = [...[0, 3, 0], ...[0, 6, 0], ...[5, 3, 0]];
//Blue PART
let t3 = [...[5.75, 2.75, 0], ...[-0.25, 6.5, 0], ...[-0.25, 2.75, 0]];
let t4 = [...[-0.25, -0.25, 0], ...[5.75, -0.25, 0], ...[-0.25, 4.25, 0]];
//sun
var sunVertexData = [];
function createSunVertexList(radius, xo, yo) {
  let x, y;
  for (i = 0; i < 360; i += 45) {
    sunVertexData.push(...[xo, yo, 0]);
    x = radius * Math.cos((Math.PI / 180) * i) + xo;
    y = radius * Math.sin((Math.PI / 180) * i) + yo;
    sunVertexData.push(...[x, y, 0]);
    x = radius * Math.cos((Math.PI / 180) * (i + 45)) + xo;
    y = radius * Math.sin((Math.PI / 180) * (i + 45)) + yo;
    sunVertexData.push(...[x, y, 0]);
  }
}
createSunVertexList(0.75, 1.25, 1.25);
//moon
var moonVertexData = [];
function createMoonVertexList(radius, xo, yo) {
  let x, y;
  for (i = 0; i > -180; i -= 45) {
    moonVertexData.push(...[xo, yo, 0]);
    x = radius * Math.cos((Math.PI / 180) * i) + xo;
    y = radius * Math.sin((Math.PI / 180) * i) + yo;
    moonVertexData.push(...[x, y, 0]);
    x = radius * Math.cos((Math.PI / 180) * (i - 45)) + xo;
    y = radius * Math.sin((Math.PI / 180) * (i - 45)) + yo;
    moonVertexData.push(...[x, y, 0]);
  }
}
createMoonVertexList(0.75, 1.25, 4.25);
//processing data
const vertexData = [];
const dataArray = [
  ...t1,
  ...t2,
  ...t3,
  ...t4,
  ...sunVertexData,
  ...moonVertexData,
];
for (let i = 0; i < dataArray.length; i++) {
  let y = dataArray[i] / 6.5;
  vertexData.push(y);
}
console.log(vertexData);
