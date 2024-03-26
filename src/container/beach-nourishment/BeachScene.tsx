import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { BeachSceneProps } from "./types";
import { arange } from "../../utils/arange";

const Square = ({
  position,
  color,
}: {
  position: Array<number>;
  color: string | number;
}) => {
  const pyramidRef = useRef(null);
  const edge = 0.9;
  return (
    <mesh ref={pyramidRef} position={position}>
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

const BeachScene: React.FunctionComponent<BeachSceneProps> = ({
  A,
  x,
  y,
  matris,
}) => {
  const squares = matris.map((p) => (
    <Square
      key={Math.random()}
      position={[p[0] - x / 2, p[1], p[2]]}
      color={p[3]}
    />
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
      <gridHelper
        args={[matris.length / 10, matris.length / 10, "red", "teal"]}
      />
      {squares}
      <Line
        points={arange(x).map((m) => [
          m - x / 2,
          -A * Math.pow(m, 2 / 3) - y,
          0,
        ])}
        color="blue" // Line color
        lineWidth={2} // Line width
      />
    </Canvas>
  );
};

export default BeachScene;
