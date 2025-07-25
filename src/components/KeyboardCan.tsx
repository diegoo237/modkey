"use client";

import React, { forwardRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/1.gltf");

// Texturas do corpo
export const bodyTexturePaths = {
  black: "/labels/baseLabels/Black.png",
  red: "/labels/baseLabels/Red.png",
  blue: "/labels/baseLabels/Blue.png",
  green: "/labels/baseLabels/Green.png",
  white: "/labels/baseLabels/White.png",
};

// Texturas das keycaps
export const keycapsTexturePaths = {
  classic: "/labels/keyCapsLabels/Classic.png",
  black: "/labels/keyCapsLabels/Black.png",
  blue: "/labels/keyCapsLabels/Blue.png",
  yellow: "/labels/keyCapsLabels/Yellow.png",
  white: "/labels/keyCapsLabels/White.png",
};

export type KeyboardCanProps = {
  bodyVariant?: keyof typeof bodyTexturePaths;
  capVariant?: keyof typeof keycapsTexturePaths;
  scale?: number;
};

export function KeyboardCan({
  bodyVariant = "black",
  keycapsVariant = "classic",
  scale = 4,
  ...props
}: KeyboardCanProps) {
  const { nodes } = useGLTF("/1.gltf") as unknown as {
    nodes: Record<string, THREE.Mesh>;
  };

    const bodyTextures = useTexture(bodyTexturePaths);
    const keycapTextures = useTexture(keycapsTexturePaths);

    bodyTextures[bodyVariant].flipY = false;
    keycapTextures[capVariant].flipY = false;

    const bodyTexture = bodyTextures[bodyVariant];
    const keycapTexture = keycapTextures[capVariant];

    const blackPlasticMaterial = new THREE.MeshStandardMaterial({
      color: "black",
      metalness: 0.4,
      roughness: 1,
    });

    return (
      <group
        {...props}
        ref={ref}
        dispose={null}
        scale={scale}
        rotation={[0, 0, 0]}
      >
        <mesh geometry={(nodes.BodyLower_BodyTexture_0 as THREE.Mesh).geometry}>
          <meshStandardMaterial map={bodyTexture} />
        </mesh>

        <mesh geometry={(nodes.BodyUpper_BodyTexture_0 as THREE.Mesh).geometry}>
          <meshStandardMaterial map={bodyTexture} />
        </mesh>

        <mesh geometry={(nodes.Controls_BodyTexture_0 as THREE.Mesh).geometry}>
          <meshStandardMaterial map={bodyTexture} />
        </mesh>

        <mesh geometry={(nodes.KeyCaps_KeyCaps_0 as THREE.Mesh).geometry}>
          <meshStandardMaterial map={keycapTexture} />
        </mesh>

        <mesh
          geometry={(nodes.KeyTray_Black_0 as THREE.Mesh).geometry}
          material={blackPlasticMaterial}
        />

        <mesh geometry={(nodes.Legs_BodyTexture_0 as THREE.Mesh).geometry}>
          <meshStandardMaterial map={bodyTexture} />
        </mesh>

        <mesh geometry={(nodes.Switch1_BodyTexture_0 as THREE.Mesh).geometry}>
          <meshStandardMaterial map={bodyTexture} />
        </mesh>

        <mesh geometry={(nodes.Switch2_BodyTexture_0 as THREE.Mesh).geometry}>
          <meshStandardMaterial map={bodyTexture} />
        </mesh>
      </group>
    );
  },
);

KeyboardCan.displayName = "KeyboardCan";
