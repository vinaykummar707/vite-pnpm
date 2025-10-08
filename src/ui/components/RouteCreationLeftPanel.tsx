"use client";
/*
 * Documentation:
 * Accordion — https://app.subframe.com/74c5de8a4438/library?component=Accordion_d2e81e20-863a-4027-826a-991d8910efd9
 * Icon with background — https://app.subframe.com/74c5de8a4438/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * RouteCreationLeftPanel — https://app.subframe.com/74c5de8a4438/library?component=RouteCreationLeftPanel_ff0373a9-1173-4cb1-8849-3dc495e89b43
 * Switch — https://app.subframe.com/74c5de8a4438/library?component=Switch_7a464794-9ea9-4040-b1de-5bfb2ce599d9
 */

import React from "react";
import { FeatherBarChart2 } from "@subframe/core";
import { FeatherLanguages } from "@subframe/core";
import { FeatherMapPin } from "@subframe/core";
import { FeatherSplit } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Accordion } from "./Accordion";
import { IconWithBackground } from "./IconWithBackground";
import { Switch } from "./Switch";

interface RouteCreationLeftPanelRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  routeFields?: React.ReactNode;
  languageList?: React.ReactNode;
  splitRouteSwitch?: React.ReactNode;
  className?: string;
}

const RouteCreationLeftPanelRoot = React.forwardRef<
  HTMLDivElement,
  RouteCreationLeftPanelRootProps
>(function RouteCreationLeftPanelRoot(
  {
    routeFields,
    languageList,
    splitRouteSwitch,
    className,
    ...otherProps
  }: RouteCreationLeftPanelRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-full flex-col items-start gap-2 px-4 pb-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-64 grow shrink-0 basis-0 flex-col items-start">
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background">
          <Accordion
            trigger={
              <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-3">
                <IconWithBackground
                  variant="brand"
                  size="small"
                  icon={<FeatherMapPin />}
                  square={false}
                />
                <span className="grow shrink-0 basis-0 text-caption-bold font-caption-bold text-default-font">
                  Route Details
                </span>
                <Accordion.Chevron />
              </div>
            }
            defaultOpen={true}
          >
            {routeFields ? (
              <div className="flex h-80 no-scrollbar w-full flex-none flex-col items-start border-b border-solid border-neutral-border pl-5 pr-4 pt-2 pb-4 overflow-y-auto">
                {routeFields}
              </div>
            ) : null}
          </Accordion>
          <Accordion
            trigger={
              <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-3">
                <IconWithBackground
                  variant="brand"
                  size="small"
                  icon={<FeatherLanguages />}
                  square={false}
                />
                <span className="grow shrink-0 basis-0 text-caption-bold font-caption-bold text-default-font">
                  Languages Selection
                </span>
                <Accordion.Chevron />
              </div>
            }
            defaultOpen={true}
          >
            {languageList ? (
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start justify-end border-b border-solid border-neutral-border pl-5 pr-4 pt-2 pb-5">
                {languageList}
              </div>
            ) : null}
          </Accordion>
          <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-3">
            <IconWithBackground
              variant="brand"
              size="small"
              icon={<FeatherSplit />}
              square={false}
            />
            <span className="grow shrink-0 basis-0 text-caption-bold font-caption-bold text-default-font">
              Split Route
            </span>
            {splitRouteSwitch ? (
              <div className="flex items-center justify-end">
                {splitRouteSwitch}
              </div>
            ) : null}
          </div>
          <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-3">
            <IconWithBackground
              variant="brand"
              size="small"
              icon={<FeatherBarChart2 />}
              square={false}
            />
            <span className="grow shrink-0 basis-0 text-caption-bold font-caption-bold text-default-font">
              Enable analytics
            </span>
            <div className="flex items-center justify-end">
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const RouteCreationLeftPanel = RouteCreationLeftPanelRoot;
