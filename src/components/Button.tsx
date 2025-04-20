import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

type Props = {
  buttonLink: LinkField;
  buttonText: string | null;
  className?: string;
};

export default function Button({ buttonLink, buttonText, className }: Props) {
  return (
    <PrismicNextLink
      className={clsx(
        "rounded-xl bg-stone-400 px-5 py-4 text-center font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-stone-500 md:text-2xl",
        className,
      )}
      field={buttonLink}
    >
      {buttonText}
    </PrismicNextLink>
  );
}
