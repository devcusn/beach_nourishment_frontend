import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls, Text } from "@react-three/drei";
import { BeachSceneProps } from "./types";
import { arange } from "../../utils/arange";
import * as THREE from "three";

const Grain = ({ z, length, x }) => {
  console.log("beach", length);
  return (
    <>
      <mesh position={[length, 0, z]}>
        <boxGeometry args={[x, 2, 6]} />
        <meshBasicMaterial color={"black"} />
      </mesh>
    </>
  );
};

const BeachRevetment = ({ revetment, beach_length, coast_length }) => {
  console.log(beach_length, coast_length);
  console.log("beach_length", beach_length);
  console.log("coast_length", coast_length);
  return (
    <mesh position={[revetment / 2 + beach_length, 1, coast_length / 2 + 1]}>
      <boxGeometry args={[1, 3, coast_length]} />
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
  matris,
  beach_length,
  coast_length,
  revetment,
}) => {
  const water = matris.filter((m) => m[3] === "blue");
  const soil = matris.filter((m) => m[3] === "orange");
  return (
    <Canvas
      style={{ backgroundColor: "#f0f0f0", height: "100%" }}
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
      <Line
        points={arange(x).map((m) => [
          m - x / 2 + beach_length,
          -A * Math.pow(m, 2 / 3) - y,
          coast_length,
        ])}
        color="red"
        lineWidth={5}
      />
      <BeachWater matris={water} x={x} />
      <BeachSoil matris={soil} x={x} />
      <BeachRevetment
        revetment={revetment}
        beach_length={beach_length}
        coast_length={coast_length}
      />
      <Grain z={-2} length={beach_length} x={x} />
      <Grain z={coast_length + 2} length={beach_length} x={x} />
    </Canvas>
  );
};

export default BeachScene;
