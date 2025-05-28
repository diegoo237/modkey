"use client";

import { KeyboardCan } from "@/components/KeyboardCan";

import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Group } from "three";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef } from "react";
import React from "react";

gsap.registerPlugin(useGSAP);

export default function Scene() {
  const float = 1;

  const groupRef = useRef<Group>(null);
  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);

  useGSAP(
    () => {
      if (
        !can1Ref.current ||
        !can2Ref.current ||
        !can3Ref.current ||
        !can4Ref.current ||
        !can5Ref.current
      )
        return;

      const introTl = gsap.timeline({
        defaults: {
          duration: 3,
          ease: "back.out(1.4)",
        },
      });
      introTl

        .to(can1Ref.current.position, { x: 0, y: -0.1, z: 1.1 }, 0) // Frente
        .to(can1Ref.current.rotation, { y: -0.4, z: 1.25 }, 0)

        .to(can2Ref.current.position, { x: 0.8, y: 0.1, z: 0.1 }, 0) // Frente-direita
        .to(can2Ref.current.rotation, { y: -0.4, z: 1.25 }, 0)

        .to(can3Ref.current.position, { x: -0.8, y: 0.1, z: 0.1 }, 0) // Frente-esquerda
        .to(can3Ref.current.rotation, { y: -0.4, z: 1.25 }, 0)

        .to(can4Ref.current.position, { x: -0.6, y: 0.5, z: -1 }, 0) // Trás-esquerda
        .to(can4Ref.current.rotation, { y: -0.4, z: 1.25 }, 0)

        .to(can5Ref.current.position, { x: 0.6, y: 0.5, z: -1 }, 0) // Trás-direita
        .to(can5Ref.current.rotation, { y: -0.4, z: 1.25 }, 0);
    },
    { scope: groupRef },
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={float}
        rotationIntensity={float}
        floatIntensity={float}
        // floatingRange={0}
      >
        <KeyboardCan
          ref={can1Ref}
          bodyVariant={"black"}
          capVariant={"classic"}
        />
        <KeyboardCan ref={can2Ref} bodyVariant={"white"} capVariant={"blue"} />
        <KeyboardCan ref={can3Ref} bodyVariant={"blue"} capVariant={"white"} />
        <KeyboardCan ref={can4Ref} bodyVariant={"red"} capVariant={"black"} />
        <KeyboardCan
          ref={can5Ref}
          bodyVariant={"green"}
          capVariant={"yellow"}
        />
      </Float>
    </group>
  );
}
