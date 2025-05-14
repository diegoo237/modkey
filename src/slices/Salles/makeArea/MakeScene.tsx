"use client";

import { Environment, Center, Float, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { KeyboardCan } from "./KeyboardCan";

interface SceneProps {
  bodyVariant: string;
  capVariant: string;
  buttonClick: boolean;
}

export default function Scene({ bodyVariant, capVariant }: SceneProps) {
  const can1Ref = useRef<{
    group1: THREE.Group | null;
    group2: THREE.Group | null;
    group3: THREE.Group | null;
  }>({
    group1: null,
    group2: null,
    group3: null,
  });

  return (
    <group>
      <Center position={[0, 0, 1.5]}>
        <Float speed={2} rotationIntensity={3} floatIntensity={1}>
          <KeyboardCan
            ref={can1Ref}
            bodyVariant={bodyVariant}
            keycapsVariant={capVariant}
          />
        </Float>
      </Center>
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
