import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { BeachSceneProps } from "./types";
import { arange } from "../../utils/arange";
import * as THREE from "three";

const BeachRevetment = ({ revetment, beach_length }) => {
  return (
    <mesh position={[0, 1, beach_length / 2 + 1]}>
      <boxGeometry args={[1, 3, beach_length]} />
      <meshBasicMaterial color={"purple"} />
    </mesh>
  );
};

const BeachWater = ({
  matris,
  x,
}: {
  matris: Array<Array<number>>;
  x: number;
}) => {
  const dummy = new THREE.Object3D();
  const dummyColor = new THREE.Color();

  const meshRef = useRef(null);
  const edge = 0.9;

  useEffect(() => {
    for (let m = 0; m < matris.length; m++) {
      const color = matris[m][3];
      dummy.position.set(matris[m][0] - x / 2, matris[m][1], matris[m][2]);
      dummy.rotation.z = dummy.rotation.y * 2;
      dummy.updateMatrix();
      meshRef.current.setColorAt(m, dummyColor.set(color));
      meshRef.current.setMatrixAt(m, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  }, [matris]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, matris.length]}>
      <boxGeometry args={[edge, edge, edge]} />
      <meshBasicMaterial transparent opacity={0.4} />
    </instancedMesh>
  );
};

const BeachSoil = ({
  matris,
  x,
}: {
  matris: Array<Array<number>>;
  x: number;
}) => {
  const dummy = new THREE.Object3D();
  const dummyColor = new THREE.Color();

  const meshRef = useRef(null);
  const edge = 0.4;

  useEffect(() => {
    for (let m = 0; m < matris.length; m++) {
      const color = matris[m][3];
      dummy.position.set(matris[m][0] - x / 2, matris[m][1], matris[m][2]);
      dummy.rotation.z = dummy.rotation.y * 2;
      dummy.updateMatrix();
      meshRef.current.setColorAt(m, dummyColor.set(color));
      meshRef.current.setMatrixAt(m, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  }, [matris]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, matris.length]}>
      <boxGeometry args={[edge, edge, edge]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
};

const BeachScene: React.FunctionComponent<BeachSceneProps> = ({
  A,
  x,
  y,
  z,
  matris,
  beach_length,
  revetment,
}) => {
  // const squares = matris.map((p: Array<number>) => (
  //   <Square
  //     key={Math.random()}
  //     position={[p[0] - x / 2, p[1], p[2]]}
  //     color={p[3]}
  //   />
  // ));
  const water = matris.filter((m) => m[3] === "blue");
  const soil = matris.filter((m) => m[3] === "orange");
  console.log(water.length);
  console.log(soil.length);
  return (
    <Canvas
      style={{ backgroundColor: "#f0f0f0", height: "100vh" }}
      camera={{ fov: 50, near: 1, far: 100000000, position: [25, 25, 50] }}
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
      <gridHelper
        args={[matris.length / 10, matris.length / 10, "red", "teal"]}
      />
      {/* {squares} */}
      <Line
        points={arange(x).map((m) => [
          m - x / 2 + beach_length,
          -A * Math.pow(m, 2 / 3) - y,
          z,
        ])}
        color="red" // Line color
        lineWidth={5} // Line width
      />
      <BeachWater matris={water} x={x} />
      <BeachSoil matris={soil} x={x} />
      <BeachRevetment revetment={revetment} beach_length={z} />
    </Canvas>
  );
};

export default BeachScene;
