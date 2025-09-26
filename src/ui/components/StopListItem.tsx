"use client";
/*
 * Documentation:
 * Accordion — https://app.subframe.com/74c5de8a4438/library?component=Accordion_d2e81e20-863a-4027-826a-991d8910efd9
 * Icon with background — https://app.subframe.com/74c5de8a4438/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * StopListItem — https://app.subframe.com/74c5de8a4438/library?component=StopListItem_8aeeba27-2b7f-48cd-b822-db04a4fd2e6b
 */

import React from "react";
import { FeatherMapPin } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Accordion } from "./Accordion";
import { IconWithBackground } from "./IconWithBackground";

interface StopListItemRootProps extends React.HTMLAttributes<HTMLDivElement> {
  locationName?: React.ReactNode;
  actions?: React.ReactNode;
  upCoordinates?: React.ReactNode;
  downCoordinates?: React.ReactNode;
  tabsAndAnnouncements?: React.ReactNode;
  className?: string;
}

const StopListItemRoot = React.forwardRef<
  HTMLDivElement,
  StopListItemRootProps
>(function StopListItemRoot(
  {
    locationName,
    actions,
    upCoordinates,
    downCoordinates,
    tabsAndAnnouncements,
    className,
    ...otherProps
  }: StopListItemRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full flex-col items-start rounded-md border border-solid border-neutral-border">
        <Accordion
          trigger={
            <div className="flex w-full items-center gap-4 px-4 py-4">
              <IconWithBackground
                size="medium"
                icon={<FeatherMapPin />}
                square={true}
              />
              {locationName ? (
                <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                  {locationName}
                </span>
              ) : null}
              {actions ? (
                <div className="flex items-center gap-2">{actions}</div>
              ) : null}
              <Accordion.Chevron />
            </div>
          }
          defaultOpen={true}
        >
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 border-t border-solid border-neutral-border bg-neutral-50 px-6 pt-4 pb-6">
            <span className="text-body-bold font-body-bold text-subtext-color">
              Co-ordinates
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              {upCoordinates ? (
                <div className="flex w-full flex-col items-start gap-2">
                  {upCoordinates}
                </div>
              ) : null}
              {downCoordinates ? (
                <div className="flex w-full flex-col items-start gap-2">
                  {downCoordinates}
                </div>
              ) : null}
            </div>
            <span className="text-body-bold font-body-bold text-subtext-color">
              Stop Announcements
            </span>
            <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              {tabsAndAnnouncements ? (
                <div className="flex w-full flex-col items-start gap-4">
                  {tabsAndAnnouncements}
                </div>
              ) : null}
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
});

export const StopListItem = StopListItemRoot;
