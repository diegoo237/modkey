"use client";
import { useState, useRef } from "react";

import clsx from "clsx";
import gsap from "gsap";

import { Group } from "three";
import { Center, Environment, View } from "@react-three/drei";

import { ArrowIcon } from "@/assets/ArrowIcon";
import FloatingCan from "@/components/FloatingCan";
import { KeyboardCanProps } from "@/components/KeyboardCan";
import { WavyCircles } from "./WavyCircles";

const SPINS_ON_CHANGE = 8;
const VARIANTS: {
  bodyVariant: KeyboardCanProps["bodyVariant"];
  keycapsVariant: KeyboardCanProps["keycapsVariant"];
  color: string;
  capColor: string;
}[] = [
  {
    bodyVariant: "white",
    keycapsVariant: "blue",
    color: "#FFFFFF",
    capColor: "#3671C3",
  },
  {
    bodyVariant: "green",
    keycapsVariant: "yellow",
    color: "#00FF00",
    capColor: "#CCA700",
  },
  {
    bodyVariant: "blue",
    keycapsVariant: "white",
    color: "#0000FF",
    capColor: "#FFFFFF",
  },
  {
    bodyVariant: "red",
    keycapsVariant: "black",
    color: "#FF0000",
    capColor: "#000000",
  },
  {
    bodyVariant: "black",
    keycapsVariant: "classic",
    color: "#000000",
    capColor: "#CB714B",
  },
];

export default function Catalog() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const KeyboardCanRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!KeyboardCanRef.current) return;

    const nextIndex = (index + VARIANTS.length) % VARIANTS.length;

    const tl = gsap.timeline();

    tl.to(
      KeyboardCanRef.current.rotation,
      {
        y:
          index > currentVariantIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    ).to({}, { onStart: () => setCurrentVariantIndex(nextIndex) }, 0.5);
  }

  return (
    <section className="carousel relative grid h-screen w-full grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />
      <WavyCircles
        className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2"
        outerColor={VARIANTS[currentVariantIndex].color}
        innerColor={VARIANTS[currentVariantIndex].capColor}
      />
      <h2 className="relative text-center text-5xl font-bold">
        Select Your Keyboard
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center gap-20">
        <ArrowButton
          onClick={() => changeFlavor(currentVariantIndex + 1)}
          direction="left"
          label="Previous"
        />

        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={KeyboardCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              keycapsVariant={VARIANTS[currentVariantIndex].keycapsVariant}
              bodyVariant={VARIANTS[currentVariantIndex].bodyVariant}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        <ArrowButton
          onClick={() => changeFlavor(currentVariantIndex - 1)}
          direction="right"
          label="Next"
        />
      </div>
    </section>
  );
}

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
