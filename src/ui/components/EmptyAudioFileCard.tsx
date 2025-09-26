"use client";
/*
 * Documentation:
 * EmptyAudioFileCard — https://app.subframe.com/74c5de8a4438/library?component=EmptyAudioFileCard_a306f997-93d1-42cc-ab86-adb7ebb3f5fb
 */

import React from "react";
import { FeatherFileWarning } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface EmptyAudioFileCardRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  message?: React.ReactNode;
  className?: string;
}

const EmptyAudioFileCardRoot = React.forwardRef<
  HTMLDivElement,
  EmptyAudioFileCardRootProps
>(function EmptyAudioFileCardRoot(
  {
    icon = <FeatherFileWarning />,
    message,
    className,
    ...otherProps
  }: EmptyAudioFileCardRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center justify-center gap-2 border border-solid border-neutral-border bg-neutral-50 px-2 py-2",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch">
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-center justify-center gap-2 px-2 py-2">
          {icon ? (
            <SubframeCore.IconWrapper className="text-body font-body text-subtext-color">
              {icon}
            </SubframeCore.IconWrapper>
          ) : null}
          <div className="flex flex-col items-center justify-center">
            {message ? (
              <span className="w-full text-caption font-caption text-subtext-color">
                {message}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

export const EmptyAudioFileCard = EmptyAudioFileCardRoot;
