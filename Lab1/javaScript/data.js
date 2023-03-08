//RED PART
//vertices of triangle 1
let v1 = [0, 0, 0];
let v2 = [1, 3, 0];
let v3 = [5, 0, 0];
let t1 = [...v1, ...v2, ...v3];
//vertices of tirangle 2
let v4 = [0, 0, 0];
let v5 = [0, 3, 0];
let v6 = [1, 3, 0];
let t2 = [...v4, ...v5, ...v6];
//vertices of triangle 3
let v7 = [0, 3, 0];
let v8 = [0, 6, 0];
let v9 = [5, 3, 0];
let t3 = [...v7, ...v8, ...v9];

//BLUE PART
//SIDE1
let v10 = [-0.25, -0.25, 0];
let v11 = [0, 6.25, 0];
let v12 = [-0.25, 6.5, 0];
let t4 = [...v10, ...v11, ...v12];
let v13 = [-0.25, -0.25, 0];
let v14 = [0, 6.25, 0];
let v15 = [0, -0.25, 0];
let t5 = [...v13, ...v14, ...v15];

//SIDE2
let v16 = [0, 6.25, 0];
let v17 = [0, 6, 0];
let v18 = [6, 2.75, 0];
let t6 = [...v16, ...v17, ...v18];
let v19 = [6, 2.75, 0];
let v20 = [0, 6, 0];
let v21 = [5.5, 2.75, 0];
let t7 = [...v19, ...v20, ...v21];

//SIDE3
let v22 = [5, 3, 0];
let v23 = [1, 3, 0];
let v24 = [5.5, 2.75, 0];
let t8 = [...v22, ...v23, ...v24];
let v25 = [1.5, 2.75, 0];
let v26 = [1, 3, 0];
let v27 = [5.5, 2.75, 0];
let t9 = [...v25, ...v26, ...v27];

//SIDE4
let v29 = [1, 3, 0];
let v30 = [5.25, -0.25, 0];
let v31 = [5.75, -0.25, 0];
let t10 = [...v29, ...v30, ...v31];
let v32 = [1, 3, 0];
let v33 = [1.75, 2.75, 0];
let v34 = [5.75, -0.25, 0];
let t11 = [...v32, ...v33, ...v34];

//SIDE5
let v35 = [0, 0, 0];
let v36 = [5, 0, 0];
let v37 = [0, -0.25, 0];
let t12 = [...v35, ...v36, ...v37];
let v38 = [0, -0.25, 0];
let v39 = [5, 0, 0];
let v40 = [5.25, -0.25, 0];
let t13 = [...v38, ...v39, ...v40];

const vertexData = [];
const dataArray = [
  ...t1,
  ...t2,
  ...t3,
  ...t4,
  ...t5,
  ...t6,
  ...t7,
  ...t8,
  ...t9,
  ...t10,
  ...t11,
  ...t12,
  ...t13,
];
for (let i = 0; i < dataArray.length; i++) {
  let y = dataArray[i] / 7;
  vertexData.push(y);
}

console.log(vertexData);
