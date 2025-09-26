"use client";
/*
 * Documentation:
 * Avatar — https://app.subframe.com/74c5de8a4438/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Select2 — https://app.subframe.com/74c5de8a4438/library?component=Select2_9b537f6d-1816-4ac1-8d6b-d51f6aea6dc7
 */

import React from "react";
import { FeatherCheck } from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Avatar } from "./Avatar";

interface ItemProps
  extends Omit<React.ComponentProps<typeof SubframeCore.Select.Item>, "value"> {
  value: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(function Item(
  { value, children, className, ...otherProps }: ItemProps,
  ref
) {
  return (
    <SubframeCore.Select.Item
      value={value as string}
      asChild={true}
      {...otherProps}
    >
      <div
        className={SubframeUtils.twClassNames(
          "group/d3f32d05 flex w-full cursor-pointer items-center gap-1 rounded-md px-2 py-2 hover:bg-neutral-100 active:bg-neutral-50 data-[highlighted]:bg-brand-50",
          className
        )}
        ref={ref}
      >
        <Select2.ItemText className="h-auto grow shrink-0 basis-0">
          {children || value}
        </Select2.ItemText>
        <FeatherCheck className="hidden text-body font-body text-default-font group-hover/d3f32d05:hidden group-data-[state=checked]/d3f32d05:inline-flex group-data-[state=checked]/d3f32d05:text-brand-600" />
      </div>
    </SubframeCore.Select.Item>
  );
});

interface TriggerValueProps
  extends React.ComponentProps<typeof SubframeCore.Select.Value> {
  placeholder?: React.ReactNode;
  className?: string;
}

const TriggerValue = React.forwardRef<
  React.ElementRef<typeof SubframeCore.Select.Value>,
  TriggerValueProps
>(function TriggerValue(
  { placeholder, className, ...otherProps }: TriggerValueProps,
  ref
) {
  return (
    <SubframeCore.Select.Value
      className={SubframeUtils.twClassNames(
        "w-full whitespace-nowrap text-body font-body text-default-font",
        className
      )}
      ref={ref}
      placeholder={placeholder}
      {...otherProps}
    >
      Value
    </SubframeCore.Select.Value>
  );
});

interface ContentProps
  extends React.ComponentProps<typeof SubframeCore.Select.Content> {
  children?: React.ReactNode;
  className?: string;
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>(function Content(
  { children, className, ...otherProps }: ContentProps,
  ref
) {
  return children ? (
    <SubframeCore.Select.Content asChild={true} {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          "flex w-36 flex-col items-start gap-1 overflow-hidden rounded-md border border-solid border-neutral-border bg-white px-1 py-1 shadow-lg",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    </SubframeCore.Select.Content>
  ) : null;
});

interface TriggerProps
  extends Omit<
    React.ComponentProps<typeof SubframeCore.Select.Trigger>,
    "placeholder"
  > {
  placeholder?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Trigger = React.forwardRef<HTMLDivElement, TriggerProps>(function Trigger(
  { placeholder, icon = null, className, ...otherProps }: TriggerProps,
  ref
) {
  return (
    <SubframeCore.Select.Trigger asChild={true} {...otherProps}>
      <div
        className={SubframeUtils.twClassNames(
          "flex h-full w-full items-center gap-2 px-1 py-1",
          className
        )}
        ref={ref}
      >
        {icon ? (
          <SubframeCore.IconWrapper className="text-body font-body text-neutral-400">
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
        <Select2.TriggerValue placeholder={placeholder as string} />
        <FeatherChevronDown className="text-body font-body text-subtext-color" />
      </div>
    </SubframeCore.Select.Trigger>
  );
});

interface ItemTextProps
  extends React.ComponentProps<typeof SubframeCore.Select.ItemText> {
  children?: React.ReactNode;
  className?: string;
}

const ItemText = React.forwardRef<HTMLDivElement, ItemTextProps>(
  function ItemText(
    { children, className, ...otherProps }: ItemTextProps,
    ref
  ) {
    return (
      <SubframeCore.Select.ItemText {...otherProps}>
        <div
          className={SubframeUtils.twClassNames(
            "flex flex-col items-start gap-2",
            className
          )}
          ref={ref}
        >
          <div className="flex items-center gap-2">
            <Avatar
              variant="brand"
              size="small"
              image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
              square={false}
            >
              A
            </Avatar>
            {children ? (
              <span className="text-body font-body text-default-font">
                {children}
              </span>
            ) : null}
          </div>
        </div>
      </SubframeCore.Select.ItemText>
    );
  }
);

interface Select2RootProps
  extends React.ComponentProps<typeof SubframeCore.Select.Root> {
  disabled?: boolean;
  error?: boolean;
  variant?: "outline" | "filled";
  label?: React.ReactNode;
  placeholder?: React.ReactNode;
  helpText?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const Select2Root = React.forwardRef<HTMLDivElement, Select2RootProps>(
  function Select2Root(
    {
      disabled = false,
      error = false,
      variant = "outline",
      label,
      placeholder,
      helpText,
      icon = null,
      children,
      className,
      value,
      defaultValue,
      onValueChange,
      open,
      defaultOpen,
      onOpenChange,
      dir,
      name,
      autoComplete,
      required,
      form,
      ...otherProps
    }: Select2RootProps,
    ref
  ) {
    return (
      <SubframeCore.Select.Root
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        dir={dir}
        name={name}
        autoComplete={autoComplete}
        required={required}
        form={form}
      >
        <div
          className={SubframeUtils.twClassNames(
            "group/9b537f6d flex w-full cursor-pointer flex-col items-start gap-1",
            className
          )}
          ref={ref}
          {...otherProps}
        >
          {label ? (
            <span className="text-caption-bold font-caption-bold text-default-font">
              {label}
            </span>
          ) : null}
          <div
            className={SubframeUtils.twClassNames(
              "flex w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background px-1 py-1 group-focus-within/9b537f6d:border group-focus-within/9b537f6d:border-solid group-focus-within/9b537f6d:border-brand-primary",
              {
                "border border-solid border-neutral-100 bg-neutral-100 group-hover/9b537f6d:border group-hover/9b537f6d:border-solid group-hover/9b537f6d:border-neutral-border group-hover/9b537f6d:bg-neutral-100":
                  variant === "filled",
                "border border-solid border-error-600": error,
                "bg-neutral-200": disabled,
              }
            )}
          >
            <Trigger placeholder={placeholder} icon={icon} />
          </div>
          {helpText ? (
            <span
              className={SubframeUtils.twClassNames(
                "text-caption font-caption text-subtext-color",
                { "text-error-700": error }
              )}
            >
              {helpText}
            </span>
          ) : null}
          <Content>
            {children ? (
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start">
                {children}
              </div>
            ) : null}
          </Content>
        </div>
      </SubframeCore.Select.Root>
    );
  }
);

export const Select2 = Object.assign(Select2Root, {
  Item,
  TriggerValue,
  Content,
  Trigger,
  ItemText,
});
