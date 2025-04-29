"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { GroupProps } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";

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

export const KeyboardCan = forwardRef<
  {
    group1: THREE.Group;
    group2: THREE.Group;
    group3: THREE.Group;
  },
  KeyboardCanProps
>(function KeyboardCan(
  { bodyVariant = "black", keycapsVariant = "classic", scale = 4, ...props },
  ref,
) {
  const { nodes } = useGLTF("/1.gltf") as any;
  const bodyTextures = useTexture(bodyTexturePaths);
  const keycapTextures = useTexture(keycapsTexturePaths);

  bodyTextures[bodyVariant].flipY = false;
  keycapTextures[keycapsVariant].flipY = false;

  const bodyTexture = bodyTextures[bodyVariant];
  const keycapTexture = keycapTextures[keycapsVariant];

  // Criação dos refs
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);
  const group3Ref = useRef<THREE.Group>(null);

  useImperativeHandle(ref, () => ({
    group1: group1Ref.current!,
    group2: group2Ref.current!,
    group3: group3Ref.current!,
  }));

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, 0, 0]}>
      {/* Grupo 1 - BodyUpper + KeyTray */}
      <group ref={group1Ref}>
        <mesh geometry={nodes.BodyUpper_BodyTexture_0.geometry}>
          <meshStandardMaterial map={bodyTexture} />
        </mesh>
        <mesh
          geometry={nodes.KeyTray_Black_0.geometry}
          material={
            new THREE.MeshStandardMaterial({
              color: "black",
              metalness: 0.4,
              roughness: 1,
            })
          }
        />
      </group>

      {/* Grupo 2 - BodyLower + Controls + Legs + Switch1 + Switch2 */}
      <group ref={group2Ref}>
        <mesh geometry={nodes.BodyLower_BodyTexture_0.geometry}>
          <meshStandardMaterial map={bodyTexture} />
        </mesh>
        <mesh geometry={nodes.Controls_BodyTexture_0.geometry}>
          <meshStandardMaterial map={bodyTexture} />
        </mesh>
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

      {/* Grupo 3 - KeyCaps */}
      <group ref={group3Ref}>
        <mesh geometry={nodes.KeyCaps_KeyCaps_0.geometry}>
          <meshStandardMaterial map={keycapTexture} />
        </mesh>
      </group>
    </group>
  );
});
