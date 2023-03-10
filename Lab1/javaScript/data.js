//RED PART
//vertices of triangle 1
let v1 = [0, 0, 0];
let v2 = [0, 3.75, 0];
let v3 = [5, 0, 0];
let t1 = [...v1, ...v2, ...v3];
//vertices of tirangle 2
let v4 = [0, 3, 0];
let v5 = [0, 6, 0];
let v6 = [5, 3, 0];
let t2 = [...v4, ...v5, ...v6];

//Blue PART
let v7 = [5.75, 2.75, 0];
let v8 = [-0.25, 6.5, 0];
let v9 = [-0.25, 2.75, 0];
let t3 = [...v7, ...v8, ...v9];

let v10 = [-0.25, -0.25, 0];
let v11 = [5.75, -0.25, 0];
let v12 = [-0.25, 4.25, 0];
let t4 = [...v10, ...v11, ...v12];

//sun
var sunVertexData = [];
function createSunVertexList(radius, xo, yo) {
  let x, y;
  for (i = 0; i < 360; i += 45) {
    sunVertexData.push(xo);
    sunVertexData.push(yo);
    sunVertexData.push(0);
    x = radius * Math.cos((Math.PI / 180) * i) + xo;
    sunVertexData.push(x);
    y = radius * Math.sin((Math.PI / 180) * i) + yo;
    sunVertexData.push(y);
    sunVertexData.push(0);
    x = radius * Math.cos((Math.PI / 180) * (i + 45)) + xo;
    sunVertexData.push(x);
    y = radius * Math.sin((Math.PI / 180) * (i + 45)) + yo;
    sunVertexData.push(y);
    sunVertexData.push(0);
  }
}
createSunVertexList(0.75, 1.25, 1.25);

//moon
var moonVertexData = [];
function createMoonVertexList(radius, xo, yo) {
  let x, y;
  for (i = 0; i > -180; i -= 45) {
    moonVertexData.push(xo);
    moonVertexData.push(yo);
    moonVertexData.push(0);
    x = radius * Math.cos((Math.PI / 180) * i) + xo;
    moonVertexData.push(x);
    y = radius * Math.sin((Math.PI / 180) * i) + yo;
    moonVertexData.push(y);
    moonVertexData.push(0);
    x = radius * Math.cos((Math.PI / 180) * (i - 45)) + xo;
    moonVertexData.push(x);
    y = radius * Math.sin((Math.PI / 180) * (i - 45)) + yo;
    moonVertexData.push(y);
    moonVertexData.push(0);
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
