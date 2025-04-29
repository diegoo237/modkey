import React from "react";

type Props = { func; index; set; operator };

export default function ArrowButton({ func, index, set, operator }: Props) {
  const num = operator === "-" ? -1 : 1;

  return (
    <button onClick={() => func(set, index, num)} className="col-span-1">
      {operator === "-" ? "esquerda" : "direita"}
    </button>
  );
}
