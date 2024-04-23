import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

const LoaderNoPreview: React.FunctionComponent<{
  isLoading: boolean;
  noPreview: boolean;
}> = ({ isLoading, noPreview }) => {
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
      <gridHelper args={[100, 100, "red", "teal"]} />

      <Text
        scale={[10, 10, 10]}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {isLoading && "Loading"}
        {noPreview && "No Preview"}
      </Text>
      <Text
        scale={[3, 3, 3]}
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 10]}
      >
        {noPreview && "Add your data to get started"}
      </Text>
    </Canvas>
  );
};
export default LoaderNoPreview;
