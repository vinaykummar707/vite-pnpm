"use client";
/*
 * Documentation:
 * Custom Component — https://app.subframe.com/library?component=Custom+Component_cc97e004-22c5-4dfa-8f9b-3fb0336883ce
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface CustomComponentRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CustomComponentRoot = React.forwardRef<
  HTMLDivElement,
  CustomComponentRootProps
>(function CustomComponentRoot(
  { className, ...otherProps }: CustomComponentRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex flex-col items-start gap-2",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full flex-col items-start gap-2 px-2 py-2">
        <span className="text-body font-body text-default-font">
          Kushaiguda
        </span>
      </div>
    </div>
  );
});

export const CustomComponent = CustomComponentRoot;
