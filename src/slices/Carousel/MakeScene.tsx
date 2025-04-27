"use client";

import { Environment } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { Group } from "three";
import gsap from "gsap";
import FloatingCan from "./FloatingCan";

interface SceneProps {
  floatIntensity: number;
  rotationIntensity: number;
  bodyVariant: string;
  buttonClick: boolean;
}

export default function Scene({
  floatIntensity,
  rotationIntensity,
  bodyVariant,
  buttonClick,
}: SceneProps) {
  const can1Ref = useRef<{
    group1: THREE.Group | null;
    group2: THREE.Group | null;
    group3: THREE.Group | null;
  }>({
    group1: null,
    group2: null,
    group3: null,
  });

  const FLOAT_SPEED = 1.5;

  useEffect(() => {
    if (buttonClick === true) return;

    if (
      can1Ref.current.group1 &&
      can1Ref.current.group2 &&
      can1Ref.current.group3
    ) {
      const { group1, group2, group3 } = can1Ref.current;

      const tl = gsap.timeline();

      tl.to(group1.position, {
        y: 0,
        duration: 0.5,
        ease: "slow(0.7,0.7,false)",
      })

        .to(group2.position, {
          y: -0.15,
          duration: 0.5,
          ease: "slow(0.7,0.7,false)",
        })

        .to(group3.position, {
          y: 0.15,
          duration: 0.5,
          ease: "slow(0.7,0.7,false)",
        })
        .to(group1.rotation, {
          x: -0.5,
          duration: 0.5,
          ease: "slow(0.7,0.7,false)",
        })
        .to(group2.rotation, {
          x: -0.5,
          duration: 0.5,
          ease: "slow(0.7,0.7,false)",
        })
        .to(group3.rotation, {
          x: -0.5,
          duration: 0.5,
          ease: "slow(0.7,0.7,false)",
        });
    }
  }, [buttonClick]);

  return (
    <>
      <group>
        <FloatingCan
          bodyVariant={bodyVariant}
          keycapsVariant="classic"
          floatSpeed={0}
          floatIntensity={0}
          rotationIntensity={0}
          ref={(ref) => {
            if (ref) {
              can1Ref.current.group1 = ref.group1;
              can1Ref.current.group2 = ref.group2;
              can1Ref.current.group3 = ref.group3;
            }
          }}
        />
        <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
      </group>
    </>
  );
}
