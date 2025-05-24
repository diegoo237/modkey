import { ArrowIcon } from "@/assets/ArrowIcon";
import clsx from "clsx";
import React from "react";

type Props = {
  func: (set: (value: number) => void, index: number, num: number) => void;
  index: number;
  set: (value: number) => void;
  operator: "+" | "-";
};

export default function ArrowButton({ func, index, set, operator }: Props) {
  const num = operator === "-" ? -1 : 1;

  return (
    <button
      onClick={() => func(set, index, num)}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(operator === "+" && "-scale-x-100")} />
    </button>
  );
}
