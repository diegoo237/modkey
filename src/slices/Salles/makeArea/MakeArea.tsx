"use client";
import { useState } from "react";

import { Environment, View } from "@react-three/drei";

import { PrismicText } from "@prismicio/react";
import { Content } from "@prismicio/client";

import MakeScene from "./MakeScene";

import { KeyboardCanProps } from "@/components/KeyboardCan";
import { WavyCircles } from "../preDefault/WavyCircles";
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
  { capVariant: "classic", color: "#CB714B", name: "Classic Label" },
  { capVariant: "black", color: "#000000", name: "Black Label" },
  { capVariant: "blue", color: "#3671C3", name: "Blue Label" },
  { capVariant: "yellow", color: "#CCA700", name: "Yellow Label" },
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
  slice: Content.SallesSlice;
  display: "none" | "flex";
  togleD: (value: "none" | "flex") => void;
};

export default function MakeArea({ slice, display, togleD }: MakeAreaProps) {
  const [displayb, setDisplayb] = useState(false);
  const [currentBodyIndex, setCurrentBodyIndex] = useState(0);
  const [currentCapIndex, setCurrentCapIndex] = useState(0);

  function clickBtn() {
    setDisplayb(true);
    togleD(display === "flex" ? "none" : "flex");
  }

  return (
    <div
      className={`relative flex h-full min-h-32 w-full flex-col items-center justify-center rounded-xl bg-[#73293B] ${
        display === "none" ? "hidden" : "block"
      }`}
    >
      {displayb && (
        <WavyCircles
          className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2"
          outerColor={UPPERCOLORS[currentBodyIndex].color}
          innerColor={CAPSCOLORS[currentCapIndex].color}
        />
      )}

      <h2
        className={`relative text-center text-5xl font-bold ${displayb ? "flex" : "hidden"}`}
      >
        Make Your Keyboard
      </h2>
      <div className="grid grid-cols-[auto_auto_auto]">
        <div
          className={`items-center justify-center gap-5 ${displayb ? "flex" : "hidden"}`}
        >
          <ArrowButton
            func={changeCapVariant}
            index={currentCapIndex}
            set={setCurrentCapIndex}
            operator={"-"}
          />
          <h2 className="text-3xl font-bold">KeyCap</h2>
          <ArrowButton
            func={changeCapVariant}
            index={currentCapIndex}
            set={setCurrentCapIndex}
            operator={"+"}
          />
        </div>

        <View className="col-span-1 aspect-square h-[20rem] min-h-32 xl:h-[34rem]">
          <MakeScene
            buttonClick={displayb}
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
          className={`items-center justify-center gap-5 ${displayb ? "flex" : "hidden"}`}
        >
          <ArrowButton
            func={changeBodyVariant}
            index={currentBodyIndex}
            set={setCurrentBodyIndex}
            operator={"-"}
          />
          <h2 className="text-3xl font-bold">Case</h2>

          <ArrowButton
            func={changeBodyVariant}
            index={currentBodyIndex}
            set={setCurrentBodyIndex}
            operator={"+"}
          />
        </div>
      </div>
      <button
        onClick={() => clickBtn()}
        className={`${displayb ? "hidden" : "block"} mt-4 rounded-lg bg-[#72132B] px-7 py-3 text-center text-3xl font-bold hover:bg-[#660d23] hover:px-9 hover:py-4 md:text-5xl`}
      >
        <PrismicText field={slice.primary.heding} />
      </button>
    </div>
  );
}
