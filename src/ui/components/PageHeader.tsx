"use client";
/*
 * Documentation:
 * PageHeader — https://app.subframe.com/library?component=PageHeader_09bd771e-3d7c-4335-a1de-27c49ad880df
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface PageHeaderRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const PageHeaderRoot = React.forwardRef<HTMLDivElement, PageHeaderRootProps>(
  function PageHeaderRoot(
    { title, subtitle, actions, className, ...otherProps }: PageHeaderRootProps,
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
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
          {title ? (
            <span className="w-full text-heading-2 font-heading-2 text-default-font">
              {title}
            </span>
          ) : null}
          {subtitle ? (
            <span className="text-body font-body text-subtext-color">
              {subtitle}
            </span>
          ) : null}
        </div>
        {actions ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : null}
      </div>
    );
  }
);

export const PageHeader = PageHeaderRoot;
