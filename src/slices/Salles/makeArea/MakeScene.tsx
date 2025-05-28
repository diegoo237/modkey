"use client";

import { Environment, Center, Float } from "@react-three/drei";
import { KeyboardCan } from "./KeyboardCan";

interface SceneProps {
  bodyVariant?: "black" | "red" | "blue" | "green" | "white";
  capVariant: "classic" | "black" | "blue" | "yellow" | "white";
  buttonClick: boolean;
}

export default function Scene({ bodyVariant, capVariant }: SceneProps) {
  return (
    <group>
      <Center position={[0, 0, 1.5]}>
        <Float speed={2} rotationIntensity={3} floatIntensity={1}>
          <KeyboardCan bodyVariant={bodyVariant} keycapsVariant={capVariant} />
        </Float>
      </Center>
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
