"use client";
/*
 * Documentation:
 * OrganizationSelect — https://app.subframe.com/74c5de8a4438/library?component=OrganizationSelect_4a479887-040f-43e0-b43b-51165f69c813
 * Select — https://app.subframe.com/74c5de8a4438/library?component=Select_bb88f90b-8c43-4b73-9c2f-3558ce7838f3
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Select } from "./Select";

interface OrganizationSelectRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const OrganizationSelectRoot = React.forwardRef<
  HTMLDivElement,
  OrganizationSelectRootProps
>(function OrganizationSelectRoot(
  { className, ...otherProps }: OrganizationSelectRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-2 px-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <Select
        className="h-auto w-full flex-none"
        label=""
        placeholder="Select"
        helpText=""
      >
        <Select.Item value="Item 1">Item 1</Select.Item>
        <Select.Item value="Item 2">Item 2</Select.Item>
        <Select.Item value="Item 3">Item 3</Select.Item>
      </Select>
    </div>
  );
});

export const OrganizationSelect = OrganizationSelectRoot;
