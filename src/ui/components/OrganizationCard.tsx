"use client";
/*
 * Documentation:
 * OrganizationCard — https://app.subframe.com/library?component=OrganizationCard_f5fdb24c-b6b7-42d9-b1ef-fc32fd7b192b
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface OrganizationCardRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  avatar?: React.ReactNode;
  name?: React.ReactNode;
  title?: React.ReactNode;
  categories?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const OrganizationCardRoot = React.forwardRef<
  HTMLDivElement,
  OrganizationCardRootProps
>(function OrganizationCardRoot(
  {
    avatar,
    name,
    title,
    categories,
    actions,
    className,
    ...otherProps
  }: OrganizationCardRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-full w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full items-center justify-between">
        {avatar ? (
          <div className="flex items-center justify-between">{avatar}</div>
        ) : null}
      </div>
      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start">
        {name ? (
          <span className="w-full text-heading-3 font-heading-3 text-default-font">
            {name}
          </span>
        ) : null}
        {title ? (
          <span className="text-caption font-caption text-subtext-color">
            {title}
          </span>
        ) : null}
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <span className="w-full text-caption font-caption text-subtext-color">
          Categories
        </span>
        {categories ? (
          <div className="flex w-full flex-col items-start gap-2">
            {categories}
          </div>
        ) : null}
      </div>
      {actions ? <div className="flex items-start gap-2">{actions}</div> : null}
    </div>
  );
});

export const OrganizationCard = OrganizationCardRoot;
