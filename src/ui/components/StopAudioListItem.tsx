"use client";
/*
 * Documentation:
 * StopAudioListItem — https://app.subframe.com/library?component=StopAudioListItem_000c7843-fcae-48a1-ad70-3d10513b32d8
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface StopAudioListItemRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactNode;
  fileName?: React.ReactNode;
  dueDate?: React.ReactNode;
  actions?: React.ReactNode;
  langCode?: React.ReactNode;
  variant?: "default";
  className?: string;
}

const StopAudioListItemRoot = React.forwardRef<
  HTMLDivElement,
  StopAudioListItemRootProps
>(function StopAudioListItemRoot(
  {
    avatar,
    fileName,
    dueDate,
    actions,
    langCode,
    variant = "default",
    className,
    ...otherProps
  }: StopAudioListItemRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-wrap items-center justify-between border-b border-solid border-neutral-border px-3 py-3",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          {avatar ? <div className="flex items-center">{avatar}</div> : null}
        </div>
        <div className="flex flex-col flex-wrap items-start justify-center gap-1">
          {fileName ? (
            <span className="w-full text-body-bold font-body-bold text-default-font">
              {fileName}
            </span>
          ) : null}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              {dueDate ? (
                <span className="text-caption font-caption text-subtext-color">
                  {dueDate}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-1">{actions}</div>
      ) : null}
    </div>
  );
});

export const StopAudioListItem = StopAudioListItemRoot;
