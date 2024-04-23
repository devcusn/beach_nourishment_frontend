const calculateArea = (vertices: Array<Array<number>>) => {
  const n = vertices.length;
  let area = 0;

  for (let i = 0; i < n; i++) {
    let j = (i + 1) % n;
    area += vertices[i][0] * vertices[j][1];
    area -= vertices[j][0] * vertices[i][1];
  }

  area = Math.abs(area) / 2;
  return area * 111 * 111;
};
export default calculateArea;
