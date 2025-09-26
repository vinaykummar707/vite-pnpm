"use client";
/*
 * Documentation:
 * AnnouncementList — https://app.subframe.com/74c5de8a4438/library?component=AnnouncementList_24174e23-69e9-44d6-ab14-adf95b34db8b
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface AnnouncementListRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const AnnouncementListRoot = React.forwardRef<
  HTMLDivElement,
  AnnouncementListRootProps
>(function AnnouncementListRoot(
  { children, className, ...otherProps }: AnnouncementListRootProps,
  ref
) {
  return children ? (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start gap-1",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  ) : null;
});

export const AnnouncementList = AnnouncementListRoot;
