"use client";

import { Environment } from "@react-three/drei";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { KeyboardCan } from "./KeyboardCan";

interface SceneProps {
  floatIntensity: number;
  rotationIntensity: number;
  bodyVariant: string;
  capVariant: string;
  buttonClick: boolean;
  combineClick: boolean;
}

export default function Scene({
  bodyVariant,
  buttonClick,
  combineClick,
  capVariant,
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

  useEffect(() => {
    if (
      !can1Ref.current.group1 ||
      !can1Ref.current.group2 ||
      !can1Ref.current.group3
    )
      return;

    const { group1, group2, group3 } = can1Ref.current;
    const tl = gsap.timeline();

    if (buttonClick) {
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
    if (combineClick) {
      tl.to(group1.position, {
        y: 0,
        duration: 0.2,
        ease: "slow(0.7,0.7,false)",
      })
        .to(group2.position, {
          y: 0,
          duration: 0.2,
          ease: "slow(0.7,0.7,false)",
        })
        .to(group3.position, {
          y: 0,
          duration: 0.2,
          ease: "slow(0.7,0.7,false)",
        })
        .to(group1.rotation, {
          x: 0,
          duration: 0.2,
          ease: "slow(0.7,0.7,false)",
        })
        .to(group2.rotation, {
          x: 0,
          duration: 0.2,
          ease: "slow(0.7,0.7,false)",
        })
        .to(group3.rotation, {
          x: 0,
          duration: 0.2,
          ease: "slow(0.7,0.7,false)",
        });
    }
  }, [buttonClick, combineClick]);

  return (
    <group>
      <KeyboardCan
        ref={can1Ref}
        bodyVariant={bodyVariant}
        keycapsVariant={capVariant}
      />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
