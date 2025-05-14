"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import MakeArea from "./makeArea/MakeArea";
import PreDefault from "./preDefault/PreDefault";

export type SallesProps = SliceComponentProps<Content.SallesSlice>;

const Salles: FC<SallesProps> = ({ slice }) => {
  const [makeAreaDisplay, setMakeAreaDisplay] = useState("flex");
  const [defaultAreaDisplay, setDefaultAreaDisplay] = useState("flex");

  const padding =
    makeAreaDisplay === "flex" && defaultAreaDisplay === "flex"
      ? "px-16 py-24"
      : "";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${padding} flex h-screen flex-col items-center justify-center gap-16 overflow-hidden bg-[#7105248a] text-white md:flex-row`}
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

export default Salles;
