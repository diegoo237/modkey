"use client";

import { forwardRef, ReactNode } from "react";
import { KeyboardCan, KeyboardCanProps } from "./KeyboardCan";
import { Float } from "@react-three/drei";
import { Group } from "three";

type FloatingCanProps = {
  bodyVariant?: KeyboardCanProps["bodyVariant"];
  keycapsVariant?: KeyboardCanProps["capVariant"];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  (
    {
      bodyVariant = "black",
      keycapsVariant = "classic",
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 0.5,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <KeyboardCan bodyVariant={bodyVariant} capVariant={keycapsVariant} />
        </Float>
      </group>
    );
  },
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
