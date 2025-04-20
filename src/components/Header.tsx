import React from "react";
import { ModKeyLogo } from "./ModKeyLogo";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="-mb-20 flex justify-center py-4">
      <ModKeyLogo className="z-10 h-20 cursor-pointer text-sky-800" />
    </header>
  );
}
