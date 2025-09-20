"use client";
/*
 * Documentation:
 * Icon with background — https://app.subframe.com/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * OrganizationListCard — https://app.subframe.com/library?component=OrganizationListCard_1faebf89-eb18-4fe0-ba90-b90af45643e8
 */

import React from "react";
import { FeatherBuilding } from "@subframe/core";
import { FeatherCalendar } from "@subframe/core";
import { FeatherMail } from "@subframe/core";
import { FeatherPhone } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";
import { IconWithBackground } from "./IconWithBackground";

interface OrganizationListCardRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  companyName?: React.ReactNode;
  email?: React.ReactNode;
  phone?: React.ReactNode;
  createdDate?: React.ReactNode;
  status?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const OrganizationListCardRoot = React.forwardRef<
  HTMLDivElement,
  OrganizationListCardRootProps
>(function OrganizationListCardRoot(
  {
    icon = <FeatherBuilding />,
    companyName,
    email,
    phone,
    createdDate,
    status,
    actions,
    className,
    ...otherProps
  }: OrganizationListCardRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full items-center gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex grow shrink-0 basis-0 items-center gap-2">
        <IconWithBackground size="large" icon={icon} />
        <div className="flex grow shrink-0 basis-0 flex-col items-start justify-center gap-1">
          {companyName ? (
            <span className="w-full text-title font-title text-default-font">
              {companyName}
            </span>
          ) : null}
          <div className="flex w-full flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <FeatherMail className="text-body font-body text-subtext-color" />
              {email ? (
                <span className="text-caption font-caption text-subtext-color">
                  {email}
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <FeatherPhone className="text-body font-body text-subtext-color" />
              {phone ? (
                <span className="text-caption font-caption text-subtext-color">
                  {phone}
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <FeatherCalendar className="text-body font-body text-subtext-color" />
              {createdDate ? (
                <span className="text-caption font-caption text-subtext-color">
                  {createdDate}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {status ? <div className="flex items-center gap-4">{status}</div> : null}
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
});

export const OrganizationListCard = OrganizationListCardRoot;
