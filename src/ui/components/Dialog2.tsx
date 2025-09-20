"use client";
/*
 * Documentation:
 * Dialog2 — https://app.subframe.com/library?component=Dialog2_50f37182-ce9b-4298-b26f-e781ae895baa
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface ContentProps
  extends React.ComponentProps<typeof SubframeCore.Dialog.Content> {
  children?: React.ReactNode;
  className?: string;
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>(function Content(
  { children, className, ...otherProps }: ContentProps,
  ref
) {
  return children ? (
    <SubframeCore.Dialog.Content asChild={true} {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          "flex min-w-[320px] flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background shadow-lg max-h-[90vh] overflow-auto",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    </SubframeCore.Dialog.Content>
  ) : null;
});

interface Dialog2RootProps
  extends React.ComponentProps<typeof SubframeCore.Dialog.Root> {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const Dialog2Root = React.forwardRef<HTMLDivElement, Dialog2RootProps>(
  function Dialog2Root(
    { children, className, ...otherProps }: Dialog2RootProps,
    ref
  ) {
    return children ? (
      <SubframeCore.Dialog.Root asChild={true} {...otherProps}>
        <div
          className={SubframeUtils.twClassNames(
            "flex h-full w-full flex-col items-center justify-center gap-2 bg-[#00000099]",
            className
          )}
          ref={ref}
        >
          {children}
        </div>
      </SubframeCore.Dialog.Root>
    ) : null;
  }
);

export const Dialog2 = Object.assign(Dialog2Root, {
  Content,
});
