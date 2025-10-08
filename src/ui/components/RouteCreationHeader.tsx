"use client";
/*
 * Documentation:
 * Button — https://app.subframe.com/74c5de8a4438/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * RouteCreationHeader — https://app.subframe.com/74c5de8a4438/library?component=RouteCreationHeader_107668b0-a655-4314-be0c-2fe0ddcef762
 */

import React from "react";
import { FeatherChevronLeft } from "@subframe/core";
import { FeatherCopy } from "@subframe/core";
import { FeatherSave } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Button } from "./Button";

interface RouteCreationHeaderRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const RouteCreationHeaderRoot = React.forwardRef<
  HTMLDivElement,
  RouteCreationHeaderRootProps
>(function RouteCreationHeaderRoot(
  { className, ...otherProps }: RouteCreationHeaderRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-14 w-full items-start justify-between px-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex items-center justify-center gap-2 self-stretch">
        <div className="flex items-center justify-center gap-2">
          <Button variant="neutral-secondary" icon={<FeatherChevronLeft />}>
            Back
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 self-stretch">
        <div className="flex items-center justify-end gap-2">
          <Button variant="neutral-secondary" icon={<FeatherCopy />}>
            Copy JSON
          </Button>
          <Button icon={<FeatherSave />}>Save</Button>
        </div>
      </div>
    </div>
  );
});

export const RouteCreationHeader = RouteCreationHeaderRoot;
