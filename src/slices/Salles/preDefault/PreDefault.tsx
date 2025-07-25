"use client";
import { PrismicText } from "@prismicio/react";
import { Content } from "@prismicio/client";

import Scene from "./Scene";

import { View } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { useState } from "react";
import Catalog from "./Catalog";

type PreDefaultProps = {
  slice: Content.SallesSlice;
  display: string;
  togleD: (value: "none" | "flex") => void;
};

export default function PreDefault({
  slice,
  display,
  togleD,
}: PreDefaultProps) {
  const [clickBtnState, setClickBtnState] = useState(true);

  function clickBtn() {
    setClickBtnState(false);
    togleD(display === "flex" ? "none" : "flex");
  }

  return (
    <>
      {clickBtnState ? (
        <div
          className={`flex h-full min-h-32 w-full flex-col items-center justify-center rounded-xl outline-dotted ${
            display === "none" ? "hidden" : "block"
          }`}
        >
          <>
            <View className="col-span-1 aspect-square h-[20rem] min-h-32 xl:h-[34rem]">
              <Scene />
              <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
            </View>
            <button
              onClick={() => clickBtn()}
              className="mt-4 rounded-lg bg-[#72132B] px-7 py-3 text-center text-3xl font-bold hover:bg-[#660d23] hover:px-9 hover:py-4 md:text-5xl"
            >
              <PrismicText field={slice.primary.heading2} />
            </button>
          </>
        </div>
      ) : (
        <Catalog />
      )}
    </>
  );
}
