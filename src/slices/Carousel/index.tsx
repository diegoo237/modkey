"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { KeyboardCanProps } from "@/components/KeyboardCan";
import { Center, Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";

const COLORS: {
  bodyVariant: KeyboardCanProps["bodyVariant"];
  color: string;
  name: string;
}[] = [
  { bodyVariant: "black", color: "#000000", name: "Black Label" },
  { bodyVariant: "red", color: "#FF0000", name: "Red Label" },
  { bodyVariant: "blue", color: "#0000FF", name: "Blue Label" },
  { bodyVariant: "green", color: "#00FF00", name: "Green Label" },
  { bodyVariant: "white", color: "#FFFFFF", name: "White Label" },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice }) => {
  const [currentBodyIndex, setCurrentBodyIndex] = useState(0);

  function changeBody(index: numbe) {
    const nextIndex = (index + COLORS.length) % COLORS.length;

    setCurrentBodyIndex(nextIndex);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="backgroud pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heding} />
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 0]}>
            <FloatingCan floatIntensity={0.3} rotationIntensity={1} />
          </Center>
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
      </div>

      <PrismicRichText field={slice.primary.price_copy} />
    </section>
  );
};

export default Carousel;
