"use client";
/*
 * Documentation:
 * FeatureToggle — https://app.subframe.com/library?component=FeatureToggle_adb122c5-3854-4f3f-90ce-b8932886e810
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface FeatureToggleRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  _switch?: React.ReactNode;
  boolean?: boolean;
  className?: string;
}

const FeatureToggleRoot = React.forwardRef<
  HTMLDivElement,
  FeatureToggleRootProps
>(function FeatureToggleRoot(
  {
    title,
    description,
    _switch,
    boolean = false,
    className,
    ...otherProps
  }: FeatureToggleRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/adb122c5 flex h-full w-full items-center gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm",
        { "border border-solid border-brand-primary": boolean },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
        {title ? (
          <span className="w-full text-body-bold font-body-bold text-default-font">
            {title}
          </span>
        ) : null}
        {description ? (
          <span className="w-full text-caption font-caption text-subtext-color">
            {description}
          </span>
        ) : null}
      </div>
      {_switch ? (
        <div className="flex items-center gap-4">{_switch}</div>
      ) : null}
    </div>
  );
});

export const FeatureToggle = FeatureToggleRoot;
