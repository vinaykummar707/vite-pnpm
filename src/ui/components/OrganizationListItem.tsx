"use client";
/*
 * Documentation:
 * Avatar — https://app.subframe.com/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * OrganizationListItem — https://app.subframe.com/library?component=OrganizationListItem_e88bf6e2-3828-4f5e-8a09-a7a47f208a08
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Avatar } from "./Avatar";

interface OrganizationListItemRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactNode;
  name?: React.ReactNode;
  subtitle?: React.ReactNode;
  tags?: React.ReactNode;
  actions?: React.ReactNode;
  contact?: React.ReactNode;
  className?: string;
}

const OrganizationListItemRoot = React.forwardRef<
  HTMLDivElement,
  OrganizationListItemRootProps
>(function OrganizationListItemRoot(
  {
    avatar,
    name,
    subtitle,
    tags,
    actions,
    contact,
    className,
    ...otherProps
  }: OrganizationListItemRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-start justify-between rounded-md border border-solid border-neutral-border bg-default-background px-6 py-4 shadow-sm",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex items-start gap-4">
        {avatar ? (
          <div className="flex items-center gap-2">{avatar}</div>
        ) : null}
        <div className="flex grow shrink-0 basis-0 flex-col items-start justify-center gap-1 self-stretch">
          <div className="flex w-full items-center gap-2">
            <Avatar
              size="large"
              image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
            >
              A
            </Avatar>
            {name ? (
              <span className="grow shrink-0 basis-0 text-heading-2 font-heading-2 text-default-font">
                {name}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
});

export const OrganizationListItem = OrganizationListItemRoot;
