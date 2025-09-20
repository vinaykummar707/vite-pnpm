"use client";
/*
 * Documentation:
 * Accordion — https://app.subframe.com/library?component=Accordion_d2e81e20-863a-4027-826a-991d8910efd9
 * Icon with background — https://app.subframe.com/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * OrganizationFeatureControlCard — https://app.subframe.com/library?component=OrganizationFeatureControlCard_6a04f56d-1d50-4044-a580-73382e0318ab
 */

import React from "react";
import { FeatherBuilding } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Accordion } from "./Accordion";
import { IconWithBackground } from "./IconWithBackground";

interface OrganizationFeatureControlCardRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  organizationName?: React.ReactNode;
  lastUpdated?: React.ReactNode;
  status?: React.ReactNode;
  features?: React.ReactNode;
  controls?: React.ReactNode;
  className?: string;
}

const OrganizationFeatureControlCardRoot = React.forwardRef<
  HTMLDivElement,
  OrganizationFeatureControlCardRootProps
>(function OrganizationFeatureControlCardRoot(
  {
    icon = <FeatherBuilding />,
    organizationName,
    lastUpdated,
    status,
    features,
    controls,
    className,
    ...otherProps
  }: OrganizationFeatureControlCardRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-neutral-50 px-4 py-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <Accordion
        trigger={
          <div className="flex w-full items-center gap-4">
            <div className="flex grow shrink-0 basis-0 items-center gap-4">
              <IconWithBackground size="large" icon={icon} />
              <div className="flex grow shrink-0 basis-0 flex-col items-start justify-center gap-1">
                {organizationName ? (
                  <span className="w-full text-title font-title text-default-font">
                    {organizationName}
                  </span>
                ) : null}
                {lastUpdated ? (
                  <span className="text-caption font-caption text-subtext-color">
                    {lastUpdated}
                  </span>
                ) : null}
              </div>
            </div>
            {status ? (
              <div className="flex items-center gap-4">{status}</div>
            ) : null}
            <Accordion.Chevron />
          </div>
        }
        defaultOpen={true}
      >
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 px-2 pt-4 pb-2">
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md">
            <span className="text-caption font-caption text-subtext-color">
              Features
            </span>
            {features ? (
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                {features}
              </div>
            ) : null}
          </div>
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md">
            <span className="text-caption font-caption text-subtext-color">
              Controls
            </span>
            {controls ? (
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                {controls}
              </div>
            ) : null}
          </div>
        </div>
      </Accordion>
    </div>
  );
});

export const OrganizationFeatureControlCard =
  OrganizationFeatureControlCardRoot;
