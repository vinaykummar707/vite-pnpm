"use client";
/*
 * Documentation:
 * Icon with background — https://app.subframe.com/74c5de8a4438/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * ServerFilePreview — https://app.subframe.com/74c5de8a4438/library?component=ServerFilePreview_d30239d4-65bf-4073-9b03-aa47a8f97eb8
 */

import React from "react";
import { FeatherMusic } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";
import { IconWithBackground } from "./IconWithBackground";

interface ServerFilePreviewRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  fileName?: React.ReactNode;
  fileSize?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const ServerFilePreviewRoot = React.forwardRef<
  HTMLDivElement,
  ServerFilePreviewRootProps
>(function ServerFilePreviewRoot(
  {
    icon = <FeatherMusic />,
    fileName,
    fileSize,
    actions,
    className,
    ...otherProps
  }: ServerFilePreviewRootProps,
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
        <div className="flex w-full grow shrink-0 basis-0 items-center gap-4">
          <IconWithBackground
            variant="warning"
            size="medium"
            icon={icon}
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

export const ServerFilePreview = ServerFilePreviewRoot;
