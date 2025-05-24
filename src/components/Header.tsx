import React from "react";
import { ModKeyLogo } from "./ModKeyLogo";

export default function Header() {
  return (
    <header className="-mb-20 flex justify-center py-4">
      <ModKeyLogo className="z-10 h-20 cursor-pointer text-sky-800" />
    </header>
  );
}
