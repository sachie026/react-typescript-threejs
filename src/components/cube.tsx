import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface CubeProps {
  width?: number;
  color?: string;
}

function Cube({ width, color }: CubeProps) {
  const cubeRef = useRef<Mesh>(null!);

  useFrame((_state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={cubeRef} position={[0, 0, 0]}>
      {/* boxGeometry args: width, height, depth */}
      <boxGeometry attach="geometry" args={[width, 1, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
}

export default Cube;
