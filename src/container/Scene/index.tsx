import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide, Vector3 } from "three";
export const Beach = () => {
  const coords = [
    [0, 0, 0], // 0
    [0, 10, 0], //1
    [0, 0, 30], //2
    [0, 10, 30], //3
    [-10, 0, 60], //4
    [-10, 10, 60], //5
    [50, 0, 60], //6
    [50, 2, 60], //7
    [50, 0, 0], //8
    [50, 2, 0], //9
  ];
  const coorsToVertices = (c: Array<Array<number>>) => {
    return c.flat();
  };
  const indicesToVertices = (v) => {
    return [
      0, 1, 2, 3, 2, 1, 2, 4, 5, 5, 3, 2, 6, 7, 4, 7, 4, 5, 8, 9, 0, 9, 0, 1, 6,
      8, 9, 6, 9, 7, 6,
    ];
  };
  const vertices = coorsToVertices(coords);
  const indices = indicesToVertices(coords);
  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(vertices)}
          count={vertices.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint16Array(indices)}
          count={indices.length}
          itemSize={1}
        />
        {/* <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        /> */}
        {/* <bufferAttribute
          attach="attributes-normal"
          array={normals}
          count={normals.length / 3}
          itemSize={3}
        /> */}
      </bufferGeometry>
      <meshStandardMaterial color="yellow" side={DoubleSide} />
    </mesh>
  );
};
export const Cube = () => {
  const ps = new Float32Array([
    1,
    0,
    0, //v0
    0,
    1,
    0, //v1
    -1,
    0,
    0, //v2
    0,
    -1,
    0, //v3
    1,
    0,
    1, //v4
    0,
    1,
    1, //v5
    -1,
    0,
    1, //v6
    0,
    -1,
    1, //v7
  ]);

  const indices = new Uint16Array([0, 1, 3, 2, 3, 1, 4, 5, 7, 6, 7, 5]);
  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={ps}
          count={ps.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
          itemSize={1}
        />
        {/* <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        /> */}
        {/* <bufferAttribute
          attach="attributes-normal"
          array={normals}
          count={normals.length / 3}
          itemSize={3}
        /> */}
      </bufferGeometry>
      <meshBasicMaterial color="red" />
    </mesh>
  );
};
const Square = ({
  position,
  color,
}: {
  position: Array<number>;
  color: string | number;
}) => {
  const pyramidRef = useRef(null);
  const edge = 0.4;

  return (
    <mesh ref={pyramidRef} position={new Vector3(...position)}>
      <boxGeometry args={[edge, edge, edge]} />
      <meshStandardMaterial
        transparent={color === "blue"}
        opacity={0.1}
        attach="material"
        color={color}
      />
    </mesh>
  );
};

const Scene = () => {
  const matris = [];

  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 20; k++) {
        matris.push([i, j, k]);
      }
    }
  }
  const squares = matris.map((p: Array<number>) => (
    <Square key={Math.random()} position={[p[0], p[1], p[2]]} color={p[3]} />
  ));
  return (
    <Canvas
      style={{ backgroundColor: "#f0f0f0", height: "100vh" }}
      camera={{ fov: 50, near: 1, far: 1000, position: [25, 25, 50] }}
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <OrbitControls />
      <gridHelper args={[200, 200, "red", "teal"]} />
      {/* {squares} */}
      {/* <Cube /> */}
      {/* <Line
        points={arange(25).map((m) => [m, m * 2, 0])}
        color="blue" // Line color
        lineWidth={2} // Line width
      /> */}
      <Beach />
    </Canvas>
  );
};

export default Scene;
