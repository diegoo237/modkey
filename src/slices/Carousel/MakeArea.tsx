import { Environment, View } from "@react-three/drei";
import { PrismicText } from "@prismicio/react";
import MakeScene from "./MakeScene";
import { useState } from "react";
import { Content } from "@prismicio/client";
import { KeyboardCanProps } from "@/components/KeyboardCan";

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

function changeVariant(
  setCurrentBodyIndex: React.Dispatch<React.SetStateAction<number>>,
  currentBodyIndex: number,
  direction: number,
) {
  const nextIndex =
    (currentBodyIndex + direction + COLORS.length) % COLORS.length;
  setCurrentBodyIndex(nextIndex);
}

type MakeAreaProps = {
  slice: Content.CarouselSlice;
  display: "none" | "flex";
  togleD: (value: "none" | "flex") => void;
};

export default function MakeArea({ slice, display, togleD }: MakeAreaProps) {
  const [displayb, setDisplayb] = useState(true);
  const [currentBodyIndex, setCurrentBodyIndex] = useState(0);

  function clickBtn() {
    setDisplayb(false);
    togleD(display === "flex" ? "none" : "flex");
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center bg-[#72132B] p-6 ${
        display === "none" ? "hidden" : "flex"
      }`}
    >
      <div className="grid grid-cols-[auto_auto_auto]">
        <div className="flex flex-col justify-center gap-[140px]">
          <button
            onClick={() =>
              changeVariant(setCurrentBodyIndex, currentBodyIndex, -1)
            }
            className={`col-span-1 ${displayb ? "hidden" : "block"}`}
          >
            x
          </button>
          <button
            onClick={() =>
              changeVariant(setCurrentBodyIndex, currentBodyIndex, -1)
            }
            className={`col-span-1 ${displayb ? "hidden" : "block"}`}
          >
            x
          </button>
          <button
            onClick={() =>
              changeVariant(setCurrentBodyIndex, currentBodyIndex, -1)
            }
            className={`col-span-1 ${displayb ? "hidden" : "block"}`}
          >
            x
          </button>
        </div>

        <View className="col-span-1 aspect-square h-[64vmin] min-h-32">
          <MakeScene
            buttonClick={displayb}
            floatIntensity={1}
            rotationIntensity={1}
            bodyVariant={COLORS[currentBodyIndex].bodyVariant}
          />
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        <div className="flex flex-col justify-center gap-[140px]">
          <button
            onClick={() =>
              changeVariant(setCurrentBodyIndex, currentBodyIndex, +1)
            }
            className={`col-span-1 ${displayb ? "hidden" : "block"}`}
          >
            x
          </button>
          <button
            onClick={() =>
              changeVariant(setCurrentBodyIndex, currentBodyIndex, +1)
            }
            className={`col-span-1 ${displayb ? "hidden" : "block"}`}
          >
            x
          </button>
          <button
            onClick={() =>
              changeVariant(setCurrentBodyIndex, currentBodyIndex, +1)
            }
            className={`col-span-1 ${displayb ? "hidden" : "block"}`}
          >
            x
          </button>
        </div>
      </div>

      <button
        onClick={() => clickBtn()}
        className={`${displayb ? "block" : "hidden"} mt-4 rounded-lg bg-[#73293cbc] px-7 py-3 text-center text-3xl font-bold md:text-5xl`}
      >
        <PrismicText field={slice.primary.heding} />
      </button>
    </div>
  );
}
