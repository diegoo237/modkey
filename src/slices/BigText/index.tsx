import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText: FC<BigTextProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen w-full overflow-hidden bg-sky-800 text-[#FEE832]"
    >
      <h2 className="grid w-full gap-3 py-10 text-center font-black uppercase leading-[.7]">
        <div className="text-[32vw] lg:text-[34vw]">Make</div>
        <div className="grid gap-3 text-[34vw] lg:flex lg:justify-center lg:gap-4 lg:text-[9vw]">
          <span className="inline-block">that</span>
          <span className="inline-block text-[max-18vw]">Keyboard</span>
          <span className="inline-block">your</span>
        </div>
        <div className="text-[32vw] lg:text-[34vw]">Mode</div>
      </h2>
    </section>
  );
};

export default BigText;
