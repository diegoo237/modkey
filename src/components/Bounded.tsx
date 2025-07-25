import clsx from "clsx";
import { ElementType, ComponentPropsWithRef, ReactNode } from "react";

type BoundedProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithRef<T>;

export const Bounded = <T extends ElementType = "section">({
  as,
  className,
  children,
  ...restProps
}: BoundedProps<T>) => {
  const Comp = as || "section";

  return (
    <div className={clsx("px-4 first:pt-10 md:px-6", className)} {...restProps}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {children}
      </div>
    </div>
  );
};
