"use client";
/*
 * Documentation:
 * Icon with background — https://app.subframe.com/74c5de8a4438/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * UpCoordinatesCard — https://app.subframe.com/74c5de8a4438/library?component=UpCoordinatesCard_be50282c-ace5-47fc-a22b-2923654c40ee
 */

import React from "react";
import { FeatherChevronsUp } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";
import { IconWithBackground } from "./IconWithBackground";

interface UpCoordinatesCardRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  latitude?: React.ReactNode;
  longitude?: React.ReactNode;
  navigationButton?: React.ReactNode;
  className?: string;
}

const UpCoordinatesCardRoot = React.forwardRef<
  HTMLDivElement,
  UpCoordinatesCardRootProps
>(function UpCoordinatesCardRoot(
  {
    icon = <FeatherChevronsUp />,
    title,
    latitude,
    longitude,
    navigationButton,
    className,
    ...otherProps
  }: UpCoordinatesCardRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-start gap-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IconWithBackground size="medium" icon={icon} square={true} />
            </div>
            <div className="flex flex-col items-start">
              {title ? (
                <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                  {title}
                </span>
              ) : null}
              <div className="flex items-start gap-2">
                {latitude ? (
                  <span className="line-clamp-2 text-caption font-caption text-subtext-color">
                    {latitude}
                  </span>
                ) : null}
                {longitude ? (
                  <span className="line-clamp-2 grow shrink-0 basis-0 text-caption font-caption text-subtext-color">
                    {longitude}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          {navigationButton ? (
            <div className="flex items-center justify-between">
              {navigationButton}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export const UpCoordinatesCard = UpCoordinatesCardRoot;
