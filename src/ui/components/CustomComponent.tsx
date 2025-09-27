"use client";
/*
 * Documentation:
 * Custom Component — https://app.subframe.com/74c5de8a4438/library?component=Custom+Component_dd801442-3720-4411-b750-410f8d5a4548
 * Icon with background — https://app.subframe.com/74c5de8a4438/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 */

import React from "react";
import { FeatherMusic } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { IconWithBackground } from "./IconWithBackground";

interface CustomComponentRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode;
  fileName?: React.ReactNode;
  fileSize?: React.ReactNode;
  className?: string;
}

const CustomComponentRoot = React.forwardRef<
  HTMLDivElement,
  CustomComponentRootProps
>(function CustomComponentRoot(
  {
    actions,
    fileName,
    fileSize,
    className,
    ...otherProps
  }: CustomComponentRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center justify-center gap-2 border border-solid border-neutral-border bg-neutral-100 px-3 py-2",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch">
        <div className="flex w-full grow shrink-0 basis-0 items-center gap-4">
          <IconWithBackground
            variant="warning"
            size="medium"
            icon={<FeatherMusic />}
            square={true}
          />
          <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center">
            {fileName ? (
              <span className="w-full text-body-bold font-body-bold text-default-font">
                {fileName}
              </span>
            ) : null}
            {fileSize ? (
              <span className="w-full text-caption font-caption text-subtext-color">
                {fileSize}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      {actions ? (
        <div className="flex items-center justify-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
});

export const CustomComponent = CustomComponentRoot;
