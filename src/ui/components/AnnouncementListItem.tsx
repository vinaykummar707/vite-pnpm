"use client";
/*
 * Documentation:
 * Accordion — https://app.subframe.com/74c5de8a4438/library?component=Accordion_d2e81e20-863a-4027-826a-991d8910efd9
 * AnnouncementListItem — https://app.subframe.com/74c5de8a4438/library?component=AnnouncementListItem_0cadf87e-2fce-4f43-b19d-412117240580
 * Button — https://app.subframe.com/74c5de8a4438/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Custom Component — https://app.subframe.com/74c5de8a4438/library?component=Custom+Component_dd801442-3720-4411-b750-410f8d5a4548
 * EmptyAudioFileCard — https://app.subframe.com/74c5de8a4438/library?component=EmptyAudioFileCard_a306f997-93d1-42cc-ab86-adb7ebb3f5fb
 * Icon with background — https://app.subframe.com/74c5de8a4438/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * Select — https://app.subframe.com/74c5de8a4438/library?component=Select_bb88f90b-8c43-4b73-9c2f-3558ce7838f3
 * ServerFilePreview — https://app.subframe.com/74c5de8a4438/library?component=ServerFilePreview_d30239d4-65bf-4073-9b03-aa47a8f97eb8
 * Text Field — https://app.subframe.com/74c5de8a4438/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * Timeline Divider — https://app.subframe.com/74c5de8a4438/library?component=Timeline+Divider_c388f693-3fdb-4403-b46d-41c16f1b213a
 */

import React from "react";
import { FeatherCopy } from "@subframe/core";
import { FeatherDownload } from "@subframe/core";
import { FeatherFileWarning } from "@subframe/core";
import { FeatherLanguages } from "@subframe/core";
import { FeatherMic2 } from "@subframe/core";
import { FeatherMusic } from "@subframe/core";
import { FeatherPlay } from "@subframe/core";
import { FeatherSparkle } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import { FeatherUpload } from "@subframe/core";
import { FeatherUploadCloud } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Accordion } from "./Accordion";
import { Button } from "./Button";
import { CustomComponent } from "./CustomComponent";
import { EmptyAudioFileCard } from "./EmptyAudioFileCard";
import { IconWithBackground } from "./IconWithBackground";
import { Select } from "./Select";
import { ServerFilePreview } from "./ServerFilePreview";
import { TextField } from "./TextField";
import { TimelineDivider } from "./TimelineDivider";

interface AnnouncementListItemRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  language?: React.ReactNode;
  className?: string;
}

const AnnouncementListItemRoot = React.forwardRef<
  HTMLDivElement,
  AnnouncementListItemRootProps
>(function AnnouncementListItemRoot(
  { language, className, ...otherProps }: AnnouncementListItemRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-2 max-w-7xl",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background">
        <Accordion
          trigger={
            <div className="flex w-full items-center gap-2 px-4 py-4">
              <IconWithBackground
                variant="brand"
                size="small"
                icon={<FeatherLanguages />}
                square={true}
              />
              {language ? (
                <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                  {language}
                </span>
              ) : null}
              <Accordion.Chevron />
            </div>
          }
          defaultOpen={true}
        >
          <div className="flex w-full flex-col items-start rounded-md border-t border-solid border-neutral-border">
            <div className="flex w-full flex-col items-start gap-4 px-6 py-6">
              <span className="text-caption-bold font-caption-bold text-default-font">
                File in server
              </span>
              <div className="flex w-full flex-col items-start gap-2">
                <ServerFilePreview
                  icon={<FeatherMusic />}
                  fileName="Secunderabad-En-Current.wav"
                  fileSize="25kb"
                  actions={
                    <>
                      <Button
                        disabled={false}
                        variant="neutral-secondary"
                        size="medium"
                        icon={<FeatherPlay />}
                        iconRight={null}
                        loading={false}
                      >
                        Play
                      </Button>
                      <Button
                        disabled={false}
                        variant="neutral-secondary"
                        size="medium"
                        icon={<FeatherDownload />}
                        iconRight={null}
                        loading={false}
                      >
                        Download
                      </Button>
                      <Button
                        disabled={false}
                        variant="neutral-secondary"
                        size="medium"
                        icon={<FeatherCopy />}
                        iconRight={null}
                        loading={false}
                      >
                        Copy Url
                      </Button>
                    </>
                  }
                />
                <EmptyAudioFileCard
                  icon={<FeatherFileWarning />}
                  message="No audio file found in server. Use below methods to generate audio file"
                />
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                <span className="text-caption-bold font-caption-bold text-default-font">
                  Upload Audio File
                </span>
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-brand-600 px-6 py-6">
                  <FeatherUploadCloud className="text-heading-1 font-heading-1 text-brand-700" />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-body font-body text-default-font text-center">
                      Click to select files or drag to upload
                    </span>
                    <span className="text-caption font-caption text-subtext-color text-center">
                      Up to 100 files, max file size 5MB
                    </span>
                  </div>
                  <Button
                    disabled={false}
                    variant="neutral-primary"
                    size="medium"
                    icon={null}
                    iconRight={null}
                    loading={false}
                  >
                    Choose Wav File
                  </Button>
                </div>
              </div>
              <TimelineDivider>Or</TimelineDivider>
              <span className="text-caption-bold font-caption-bold text-default-font">
                AI Audio Generation
              </span>
              <div className="flex w-full flex-col items-start gap-4 rounded-md bg-default-background">
                <div className="flex w-full flex-col items-start gap-2">
                  <div className="flex w-full items-center gap-2">
                    <div className="flex grow shrink-0 basis-0 items-center gap-2 self-stretch">
                      <div className="flex grow shrink-0 basis-0 items-center gap-2 self-stretch">
                        <div className="flex grow shrink-0 basis-0 items-start gap-2 self-stretch">
                          <TextField
                            className="h-auto grow shrink-0 basis-0"
                            label=""
                            helpText=""
                          >
                            <TextField.Input placeholder="Type text here " />
                          </TextField>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-stretch">
                      <Select
                        disabled={false}
                        error={false}
                        label=""
                        placeholder="Voice"
                        helpText=""
                        icon={<FeatherMic2 />}
                      >
                        <Select.Item value="Item 1">Item 1</Select.Item>
                        <Select.Item value="Item 2">Item 2</Select.Item>
                        <Select.Item value="Item 3">Item 3</Select.Item>
                      </Select>
                      <Button icon={<FeatherSparkle />}>Generate</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-2">
                <CustomComponent
                  actions={
                    <>
                      <Button
                        disabled={false}
                        variant="neutral-secondary"
                        size="medium"
                        icon={<FeatherPlay />}
                        iconRight={null}
                        loading={false}
                      >
                        Play
                      </Button>
                      <Button
                        disabled={false}
                        variant="neutral-secondary"
                        size="medium"
                        icon={<FeatherUpload />}
                        iconRight={null}
                        loading={false}
                      >
                        Upload To Server
                      </Button>
                    </>
                  }
                  fileName="Evaluate results"
                  fileSize="Validate your hypothesis with data"
                />
              </div>
              <div className="flex w-full items-center justify-end gap-2">
                <Button
                  className="h-8 grow shrink-0 basis-0"
                  variant="brand-secondary"
                  icon={<FeatherUpload />}
                >
                  Submit To Server
                </Button>
                <Button
                  className="h-8 grow shrink-0 basis-0"
                  variant="destructive-secondary"
                  icon={<FeatherTrash />}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
});

export const AnnouncementListItem = AnnouncementListItemRoot;
