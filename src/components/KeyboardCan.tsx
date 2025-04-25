"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/1.gltf");

const defaultTextures = {
  body: "/labels/baseLabels/Image_0.png",
  key: "/labels/keyCapsLabels/Image_3.png",
};

const blackMaterial = new THREE.MeshStandardMaterial({
  color: "black",
  metalness: 0.4,
  roughness: 1,
});

export type KeyboardCanProps = {
  body?: keyof typeof defaultTextures;
  key?: keyof typeof defaultTextures;
  scale?: number;
};

export function KeyboardCan({
  body = "body",
  key = "key",
  scale = 3,
  ...props
}: KeyboardCanProps) {
  const { nodes } = useGLTF("/1.gltf");

  const types = useTexture(defaultTextures);

  types.body.flipY = false;
  types.key.flipY = false;

  const bodyType = types[body];
  const keyType = types[key];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, 0.5, 1.57]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.BodyLower_BodyTexture_0 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial map={bodyType} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.BodyUpper_BodyTexture_0 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial map={bodyType} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Controls_BodyTexture_0 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial map={bodyType} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.KeyCaps_KeyCaps_0 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial map={keyType} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.KeyTray_Black_0 as THREE.Mesh).geometry}
        material={blackMaterial}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Legs_BodyTexture_0 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial map={bodyType} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Switch1_BodyTexture_0 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial map={bodyType} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Switch2_BodyTexture_0 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial map={bodyType} />
      </mesh>
    </group>
  );
}
