"use client";

import { Environment, View } from "@react-three/drei";
import { PrismicText } from "@prismicio/react";
import MakeScene from "./MakeScene";
import { useState } from "react";
import { Content } from "@prismicio/client";
import { KeyboardCanProps } from "@/components/KeyboardCan";
import ArrowButton from "@/components/ArrowButton";

const UPPERCOLORS: {
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

const CAPSCOLORS: {
  capVariant: KeyboardCanProps["capVariant"];
  color: string;
  name: string;
}[] = [
  { capVariant: "classic", color: "#000000", name: "Classic Label" },
  { capVariant: "black", color: "#FF0000", name: "Black Label" },
  { capVariant: "blue", color: "#0000FF", name: "Blue Label" },
  { capVariant: "yellow", color: "#00FF00", name: "Yellow Label" },
  { capVariant: "white", color: "#FFFFFF", name: "White Label" },
];

function changeBodyVariant(
  setCurrentBodyIndex: React.Dispatch<React.SetStateAction<number>>,
  currentBodyIndex: number,
  direction: number,
) {
  const nextIndex =
    (currentBodyIndex + direction + UPPERCOLORS.length) % UPPERCOLORS.length;
  setCurrentBodyIndex(nextIndex);
}

function changeCapVariant(
  setCurrentCapIndex: React.Dispatch<React.SetStateAction<number>>,
  currentCapIndex: number,
  direction: number,
) {
  const nextIndex =
    (currentCapIndex + direction + CAPSCOLORS.length) % CAPSCOLORS.length;
  setCurrentCapIndex(nextIndex);
}

type MakeAreaProps = {
  slice: Content.CarouselSlice;
  display: "none" | "flex";
  togleD: (value: "none" | "flex") => void;
};

export default function MakeArea({ slice, display, togleD }: MakeAreaProps) {
  const [displayb, setDisplayb] = useState(false);
  const [combine, setCombine] = useState(false);

  const [currentBodyIndex, setCurrentBodyIndex] = useState(0);
  const [currentCapIndex, setCurrentCapIndex] = useState(0);

  function clickBtn() {
    setDisplayb(true);
    togleD(display === "flex" ? "none" : "flex");
  }

  function handleCombine() {
    setCombine(true);
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center rounded-xl bg-[#72132B] ${
        display === "none" ? "hidden" : "flex"
      }`}
    >
      <div className="grid grid-cols-[auto_auto_auto]">
        <div
          className={`flex flex-col justify-center gap-[140px] ${displayb ? "block" : "hidden"}`}
        >
          <ArrowButton
            func={changeCapVariant}
            index={currentCapIndex}
            set={setCurrentCapIndex}
            operator={"-"}
          />
          <ArrowButton
            func={changeBodyVariant}
            index={currentBodyIndex}
            set={setCurrentBodyIndex}
            operator={"-"}
          />
          <ArrowButton
            func={changeBodyVariant}
            index={currentBodyIndex}
            set={setCurrentBodyIndex}
            operator={"-"}
          />
        </div>

        <View className="col-span-1 aspect-square h-[64vmin]">
          <MakeScene
            buttonClick={displayb}
            combineClick={combine}
            floatIntensity={1}
            rotationIntensity={1}
            bodyVariant={UPPERCOLORS[currentBodyIndex].bodyVariant}
            capVariant={CAPSCOLORS[currentCapIndex].capVariant}
          />
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        <div
          className={`flex flex-col justify-center gap-[140px] ${displayb ? "block" : "hidden"}`}
        >
          <ArrowButton
            func={changeCapVariant}
            index={currentCapIndex}
            set={setCurrentCapIndex}
            operator={"+"}
          />
          <ArrowButton
            func={changeBodyVariant}
            index={currentBodyIndex}
            set={setCurrentBodyIndex}
            operator={"+"}
          />
          <ArrowButton
            func={changeBodyVariant}
            index={currentBodyIndex}
            set={setCurrentBodyIndex}
            operator={"+"}
          />
        </div>
      </div>

      <button
        onClick={handleCombine}
        className={`${displayb ? "block" : "hidden"} mt-4 rounded-lg bg-[#73293cbc] px-7 py-3 text-center text-3xl font-bold md:text-5xl`}
      >
        COMBINAR
      </button>

      <button
        onClick={() => clickBtn()}
        className={`${displayb ? "hidden" : "block"} mt-4 rounded-lg bg-[#73293cbc] px-7 py-3 text-center text-3xl font-bold hover:bg-[#723343] hover:px-9 hover:py-4 md:text-5xl`}
      >
        <PrismicText field={slice.primary.heding} />
      </button>
    </div>
  );
}
