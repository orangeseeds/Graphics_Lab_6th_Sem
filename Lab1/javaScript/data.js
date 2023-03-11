//RED PART
t1 = [...[0, 0, 0], ...[0, 3.75, 0], ...[5, 0, 0]];
t2 = [...[0, 3, 0], ...[0, 6, 0], ...[5, 3, 0]];
//Blue PART
t3 = [...[5.75, 2.75, 0], ...[-0.25, 6.5, 0], ...[-0.25, 2.75, 0]];
t4 = [...[-0.25, -0.25, 0], ...[5.75, -0.25, 0], ...[-0.25, 4.25, 0]];

//processing data
const vertexData = [];
const dataArray = [
  ...t1,
  ...t2,
  ...t3,
  ...t4,
  ...sunVertexData,
  ...moonVertexData,
  ...moonSpikeData,
  ...sunSpikeData,
];
for (i = 0; i < dataArray.length; i++) {
  y = dataArray[i] / 6.5;
  vertexData.push(y);
}
console.log(vertexData);
