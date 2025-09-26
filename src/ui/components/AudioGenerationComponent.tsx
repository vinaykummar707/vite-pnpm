"use client";
/*
 * Documentation:
 * AudioGenerationComponent — https://app.subframe.com/74c5de8a4438/library?component=AudioGenerationComponent_910835ba-e1ab-4de6-b487-10957831bc72
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface AudioGenerationComponentRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  audioGenerationButtonSlot?: React.ReactNode;
  input?: React.ReactNode;
  className?: string;
}

const AudioGenerationComponentRoot = React.forwardRef<
  HTMLDivElement,
  AudioGenerationComponentRootProps
>(function AudioGenerationComponentRoot(
  {
    audioGenerationButtonSlot,
    input,
    className,
    ...otherProps
  }: AudioGenerationComponentRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center gap-2",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {input ? (
        <div className="flex grow shrink-0 basis-0 items-center gap-2 self-stretch">
          {input}
        </div>
      ) : null}
      {audioGenerationButtonSlot ? (
        <div className="flex items-center gap-2 self-stretch">
          {audioGenerationButtonSlot}
        </div>
      ) : null}
    </div>
  );
});

export const AudioGenerationComponent = AudioGenerationComponentRoot;
