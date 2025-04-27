import { PrismicText } from "@prismicio/react";
import { Content } from "@prismicio/client";

type PreDefaultProps = {
  slice: Content.CarouselSlice;
  display: "none" | "flex";
  togleD: (value: "none" | "flex") => void;
};

export default function PreDefault({
  slice,
  display,
  togleD,
}: PreDefaultProps) {
  return (
    <div
      className={`flex h-full min-h-32 w-full flex-col items-center justify-center bg-[#73293B] p-6 ${
        display === "none" ? "hidden" : "block"
      }`}
    >
      <div className="h-[64vmin] min-h-32"></div>
      <button
        onClick={() => togleD(display === "flex" ? "none" : "flex")}
        className="mt-4 rounded-lg bg-[#72132B] px-7 py-3 text-center text-3xl font-bold md:text-5xl"
      >
        <PrismicText field={slice.primary.heding2} />
      </button>
    </div>
  );
}
