"use client";
/*
 * Documentation:
 * Avatar — https://app.subframe.com/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Badge — https://app.subframe.com/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Button — https://app.subframe.com/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * OrganizationCard2 — https://app.subframe.com/library?component=OrganizationCard2_29020640-ac7d-47d2-8879-5652979e8389
 */

import React from "react";
import { FeatherEdit3 } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Button } from "./Button";

interface OrganizationCard2RootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  imageLink?: string;
  className?: string;
}

const OrganizationCard2Root = React.forwardRef<
  HTMLDivElement,
  OrganizationCard2RootProps
>(function OrganizationCard2Root(
  { title, imageLink, className, ...otherProps }: OrganizationCard2RootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-end justify-center rounded-md border border-solid border-neutral-border bg-neutral-50 shadow-sm",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full items-center justify-between px-4 py-4">
        <div className="flex items-center justify-center gap-4 px-2 py-2">
          <Avatar size="large" image={imageLink}>
            A
          </Avatar>
          <div className="flex flex-col items-start justify-center gap-2">
            {title ? (
              <span className="text-heading-3 font-heading-3 text-default-font">
                {title}
              </span>
            ) : null}
            <div className="flex w-full flex-wrap items-start gap-2">
              <Badge variant="error">#Technology</Badge>
              <Badge>#AI</Badge>
              <Badge variant="warning">#SaaS</Badge>
              <Badge variant="success">#Fintech</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="neutral-secondary" icon={<FeatherEdit3 />}>
            Edit
          </Button>
          <Button variant="neutral-secondary" icon={<FeatherTrash />}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
});

export const OrganizationCard2 = OrganizationCard2Root;
