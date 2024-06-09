/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { BeachRevetmentProps, BeachSceneProps, GroinProps } from "./types";
import { arange } from "../../utils/arange";
import * as THREE from "three";
import classes from "./style.module.css";
import useToggle from "../../hooks/useToggle";

const Groin: React.FunctionComponent<GroinProps> = ({ length, x, z }) => {
  return (
    <>
      <mesh position={[length, 0, z]}>
        <boxGeometry args={[x, 2, 6]} />
        <meshBasicMaterial color={"black"} />
      </mesh>
    </>
  );
};

const BeachRevetment: React.FunctionComponent<BeachRevetmentProps> = ({
  revetment,
  beach_length,
  coast_length,
}) => {
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

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const edge = 0.9;

  useEffect(() => {
    if (!meshRef.current) return;
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

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const edge = 0.4;

  useEffect(() => {
    if (!meshRef.current) return;
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [selectedScreen, setSelectedScreen] = useState(0);

  const fullScreenHandler = () => {
    setSelectedScreen(selectedScreen === 0 ? 1 : 0);
  };
  useEffect(() => {
    if (ref.current) {
      if (selectedScreen === 1) {
        ref.current.className = classes.fullScreen;

        return;
      }
      ref.current.className = classes.normal;
    }
  }, [selectedScreen, ref]);
  const [tWater, toggleWater] = useToggle(true);
  const [tSoil, toggleSoil] = useToggle(true);
  const [tRevetment, toggleRevetment] = useToggle(true);
  const [tGrain, toggleGrain] = useToggle(true);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      {selectedScreen === 1 && (
        <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className={classes.btn} onClick={() => fullScreenHandler()}>
              Exit From Fullscreen
            </button>
          </div>
          <div>
            <button onClick={toggleWater} className={classes.btn}>
              Toggle Water
            </button>
            <button onClick={toggleSoil} className={classes.btn}>
              Toggle Soil
            </button>
            <button onClick={toggleRevetment} className={classes.btn}>
              Toggle Revetment
            </button>
            <button onClick={toggleGrain} className={classes.btn}>
              Toggle Grain
            </button>
          </div>
        </div>
      )}

      <Canvas
        style={{ backgroundColor: "#f0f0f0", height: "100%" }}
        camera={{ fov: 50, near: 1, far: 100000000, position: [200, 200, 20] }}
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
        {tWater && <BeachWater matris={water} x={x} />}
        {tSoil && <BeachSoil matris={soil} x={x} />}
        {tRevetment && (
          <BeachRevetment
            revetment={revetment}
            beach_length={beach_length}
            coast_length={coast_length}
          />
        )}

        {tGrain && (
          <>
            <Groin z={-2} length={beach_length} x={x} />
            <Groin z={coast_length + 2} length={beach_length} x={x} />
          </>
        )}
      </Canvas>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => fullScreenHandler()}>FullSceen</button>
      </div>
    </div>
  );
};

export default BeachScene;
