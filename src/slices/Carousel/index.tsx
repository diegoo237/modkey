"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import MakeArea from "./MakeArea";
import PreDefault from "./PreDefault";

export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

const Carousel: FC<CarouselProps> = ({ slice }) => {
  const [makeAreaDisplay, setMakeAreaDisplay] = useState("flex");
  const [defaultAreaDisplay, setDefaultAreaDisplay] = useState("flex");
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel flex h-screen flex-col items-center justify-center overflow-hidden bg-[#7105248a] px-8 py-24 text-white md:flex-row"
    >
      <MakeArea
        slice={slice}
        display={makeAreaDisplay}
        togleD={setDefaultAreaDisplay}
      />
      <PreDefault
        slice={slice}
        display={defaultAreaDisplay}
        togleD={setMakeAreaDisplay}
      />
    </section>
  );
};

export default Carousel;
