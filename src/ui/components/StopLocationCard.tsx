"use client";
/*
 * Documentation:
 * Accordion — https://app.subframe.com/library?component=Accordion_d2e81e20-863a-4027-826a-991d8910efd9
 * Avatar — https://app.subframe.com/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Badge — https://app.subframe.com/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Button — https://app.subframe.com/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Icon with background — https://app.subframe.com/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Radio Card Group — https://app.subframe.com/library?component=Radio+Card+Group_6d5193b8-6043-4dc1-aad5-7f902ef872df
 * StopAudioListItem — https://app.subframe.com/library?component=StopAudioListItem_000c7843-fcae-48a1-ad70-3d10513b32d8
 * StopLocationCard — https://app.subframe.com/library?component=StopLocationCard_35fa4c1f-1575-47f5-ba23-b152153f3618
 */

import React from "react";
import { FeatherArrowUpRight } from "@subframe/core";
import { FeatherDownload } from "@subframe/core";
import { FeatherEdit2 } from "@subframe/core";
import { FeatherLayout } from "@subframe/core";
import { FeatherMapPin } from "@subframe/core";
import { FeatherPlay } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Accordion } from "./Accordion";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { IconWithBackground } from "./IconWithBackground";
import { RadioCardGroup } from "./RadioCardGroup";
import { StopAudioListItem } from "./StopAudioListItem";

interface StopLocationCardRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  locations?: React.ReactNode;
  tabs?: React.ReactNode;
  audioItems?: React.ReactNode;
  className?: string;
}

const StopLocationCardRoot = React.forwardRef<
  HTMLDivElement,
  StopLocationCardRootProps
>(function StopLocationCardRoot(
  {
    icon = <FeatherLayout />,
    title,
    locations,
    tabs,
    audioItems,
    className,
    ...otherProps
  }: StopLocationCardRootProps,
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
      <div className="flex w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-neutral-50">
        <Accordion
          trigger={
            <div className="flex w-full items-center gap-4 px-4 py-4">
              <IconWithBackground size="medium" icon={<FeatherMapPin />} />
              {title ? (
                <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                  {title}
                </span>
              ) : null}
              <Badge variant="neutral">1</Badge>
              <Accordion.Chevron />
            </div>
          }
          defaultOpen={true}
        >
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 bg-neutral-50 px-6 pt-4 pb-6">
            <span className="text-body font-body text-subtext-color">
              Locations
            </span>
            <RadioCardGroup className="h-auto w-full flex-none">
              <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
                {locations ? (
                  <div className="flex grow shrink-0 basis-0 items-start gap-2">
                    {locations}
                  </div>
                ) : null}
              </div>
            </RadioCardGroup>
            <span className="text-body font-body text-subtext-color">
              Announcements
            </span>
            <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full items-center justify-between">
                {tabs ? (
                  <div className="flex grow shrink-0 basis-0 items-center justify-between">
                    {tabs}
                  </div>
                ) : null}
              </div>
              <div className="flex w-full flex-col items-start">
                {audioItems ? (
                  <div className="flex w-full flex-col items-start">
                    {audioItems}
                  </div>
                ) : null}
                <div className="flex w-full flex-col items-start">
                  <StopAudioListItem
                    avatar={
                      <Avatar className="h-10 w-10 flex-none" variant="warning">
                        EN
                      </Avatar>
                    }
                    fileName="Stop Name"
                    dueDate="12 kb"
                    actions={
                      <>
                        <Button
                          variant="neutral-primary"
                          icon={<FeatherPlay />}
                        >
                          Play
                        </Button>
                        <Button
                          variant="neutral-primary"
                          icon={<FeatherDownload />}
                        >
                          Download
                        </Button>
                        <Button
                          variant="neutral-primary"
                          icon={<FeatherArrowUpRight />}
                        >
                          Go To File
                        </Button>
                      </>
                    }
                    langCode="EN"
                  />
                </div>
                <div className="flex w-full flex-col items-start">
                  <StopAudioListItem
                    avatar={
                      <Avatar className="h-10 w-10 flex-none" variant="warning">
                        EN
                      </Avatar>
                    }
                    fileName="Stop Name"
                    dueDate="12 kb"
                    actions={
                      <>
                        <Button
                          variant="neutral-primary"
                          icon={<FeatherPlay />}
                        >
                          Play
                        </Button>
                        <Button
                          variant="neutral-primary"
                          icon={<FeatherDownload />}
                        >
                          Download
                        </Button>
                        <Button
                          variant="neutral-primary"
                          icon={<FeatherArrowUpRight />}
                        >
                          Go To File
                        </Button>
                      </>
                    }
                    langCode="EN"
                  />
                </div>
                <div className="flex w-full flex-col items-start">
                  <StopAudioListItem
                    avatar={
                      <Avatar className="h-10 w-10 flex-none" variant="warning">
                        EN
                      </Avatar>
                    }
                    fileName="Stop Name"
                    dueDate="12 kb"
                    actions={
                      <>
                        <Button
                          variant="neutral-primary"
                          icon={<FeatherPlay />}
                        >
                          Play
                        </Button>
                        <Button
                          variant="neutral-primary"
                          icon={<FeatherDownload />}
                        >
                          Download
                        </Button>
                        <Button
                          variant="neutral-primary"
                          icon={<FeatherArrowUpRight />}
                        >
                          Go To File
                        </Button>
                      </>
                    }
                    langCode="EN"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-end gap-2">
              <Button variant="neutral-secondary" icon={<FeatherEdit2 />}>
                Edit Stop
              </Button>
              <Button variant="destructive-primary" icon={<FeatherTrash />}>
                Delete Stop
              </Button>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
});

export const StopLocationCard = StopLocationCardRoot;
