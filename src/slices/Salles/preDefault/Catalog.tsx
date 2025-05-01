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
  name: string;
}[] = [
  {
    bodyVariant: "white",
    keycapsVariant: "blue",
    color: "#710523",
    name: "Black Cherry",
  },
  {
    bodyVariant: "green",
    keycapsVariant: "yellow",
    color: "#572981",
    name: "Grape Goodness",
  },
  {
    bodyVariant: "blue",
    keycapsVariant: "white",
    color: "#164405",
    name: "Lemon Lime",
  },
  {
    bodyVariant: "red",
    keycapsVariant: "black",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  {
    bodyVariant: "black",
    keycapsVariant: "classic",
    color: "#4B7002",
    name: "Watermelon Crush",
  },
];

type Props = {};

export default function Catalog({}: Props) {
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
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: VARIANTS[nextIndex].color,
          fill: VARIANTS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentVariantIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  return (
    <section className="carousel relative grid h-screen w-full grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

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
