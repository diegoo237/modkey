"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";

useGLTF.preload("/1.gltf");

// Texturas do corpo
const bodyTexturePaths = {
  black: "/labels/baseLabels/Black.png",
  red: "/labels/baseLabels/Red.png",
  blue: "/labels/baseLabels/Blue.png",
  green: "/labels/baseLabels/Green.png",
  white: "/labels/baseLabels/White.png",
};

// Texturas das keycaps
const keycapsTexturePaths = {
  classic: "/labels/keyCapsLabels/Classic.png",
  black: "/labels/keyCapsLabels/Black.png",
  blue: "/labels/keyCapsLabels/Blue.png",
  yellow: "/labels/keyCapsLabels/Yellow.png",
  white: "/labels/keyCapsLabels/White.png",
};

export type KeyboardCanProps = {
  bodyVariant?: keyof typeof bodyTexturePaths;
  keycapsVariant?: keyof typeof keycapsTexturePaths;
  scale?: number;
} & GroupProps;

export function KeyboardCan({
  bodyVariant = "black",
  keycapsVariant = "classic",
  scale = 4,
  ...props
}: KeyboardCanProps) {
  const { nodes } = useGLTF("/1.gltf") as any;

  const bodyTextures = useTexture(bodyTexturePaths);
  const keycapTextures = useTexture(keycapsTexturePaths);

  bodyTextures[bodyVariant].flipY = false;
  keycapTextures[keycapsVariant].flipY = false;

  const bodyTexture = bodyTextures[bodyVariant];
  const keycapTexture = keycapTextures[keycapsVariant];

  const blackPlasticMaterial = new THREE.MeshStandardMaterial({
    color: "black",
    metalness: 0.4,
    roughness: 1,
  });

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, 0, 0]}>
      <mesh geometry={nodes.BodyLower_BodyTexture_0.geometry}>
        <meshStandardMaterial map={bodyTexture} />
      </mesh>

      <mesh geometry={nodes.BodyUpper_BodyTexture_0.geometry}>
        <meshStandardMaterial map={bodyTexture} />
      </mesh>

      <mesh geometry={nodes.Controls_BodyTexture_0.geometry}>
        <meshStandardMaterial map={bodyTexture} />
      </mesh>

      <mesh geometry={nodes.KeyCaps_KeyCaps_0.geometry}>
        <meshStandardMaterial map={keycapTexture} />
      </mesh>

      <mesh
        geometry={nodes.KeyTray_Black_0.geometry}
        material={blackPlasticMaterial}
      />

      <mesh geometry={nodes.Legs_BodyTexture_0.geometry}>
        <meshStandardMaterial map={bodyTexture} />
      </mesh>

      <mesh geometry={nodes.Switch1_BodyTexture_0.geometry}>
        <meshStandardMaterial map={bodyTexture} />
      </mesh>

      <mesh geometry={nodes.Switch2_BodyTexture_0.geometry}>
        <meshStandardMaterial map={bodyTexture} />
      </mesh>
    </group>
  );
}
