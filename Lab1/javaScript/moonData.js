//moon
var moonVertexData = [];
function createMoonVertexList(radius, xo, yo) {
  for (i = 0; i > -180; i -= 15) {
    moonVertexData.push(...[xo, yo, 0]);
    x = radius * Math.cos((Math.PI / 180) * i) + xo;
    y = radius * Math.sin((Math.PI / 180) * i) + yo;
    moonVertexData.push(...[x, y, 0]);
    x = radius * Math.cos((Math.PI / 180) * (i - 15)) + xo;
    y = radius * Math.sin((Math.PI / 180) * (i - 15)) + yo;
    moonVertexData.push(...[x, y, 0]);
  }
}
createMoonVertexList(0.75, 1.25, 4.25);
var moonSpikeData = [];
function createMoonSpikeList(radius, xo, yo) {
  gap = radius / 4;
  midWidth = gap / 2;
  leftX = xo - radius;
  leftY = yo;
  rightX = xo + gap - radius;
  rightY = yo;
  topX = leftX + midWidth;
  topY = yo + gap;
  for (i = 0; i < 8; i++) {
    moonSpikeData.push(
      ...[leftX, leftY, 0],
      ...[rightX, rightY, 0],
      ...[topX, topY, 0]
    );
    leftX = rightX;
    rightX = rightX + gap;
    topX = topX + gap;
  }
}
createMoonSpikeList(0.75, 1.25, 4.25);
