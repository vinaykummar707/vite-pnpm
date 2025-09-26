"use client";
/*
 * Documentation:
 * AudioForm — https://app.subframe.com/74c5de8a4438/library?component=AudioForm_08b685d8-0a3c-44f6-97b8-79526ab6c3b0
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface AudioFormRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const AudioFormRoot = React.forwardRef<HTMLDivElement, AudioFormRootProps>(
  function AudioFormRoot(
    { children, className, ...otherProps }: AudioFormRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <span className="text-body-bold font-body-bold text-default-font">
          English
        </span>
        {children ? (
          <div className="flex w-full flex-col items-start gap-2">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

export const AudioForm = AudioFormRoot;
