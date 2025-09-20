"use client";
/*
 * Documentation:
 * Avatar — https://app.subframe.com/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 * Default Page Layout — https://app.subframe.com/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Dropdown Menu — https://app.subframe.com/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Icon Button — https://app.subframe.com/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Sidebar with sections — https://app.subframe.com/library?component=Sidebar+with+sections_f4047c8b-cfb4-4761-b9cf-fbcae8a9b9b5
 */

import React from "react";
import { FeatherBusFront } from "@subframe/core";
import { FeatherFileType } from "@subframe/core";
import { FeatherHeadset } from "@subframe/core";
import { FeatherLandmark } from "@subframe/core";
import { FeatherLogOut } from "@subframe/core";
import { FeatherMapPin } from "@subframe/core";
import { FeatherMoreHorizontal } from "@subframe/core";
import { FeatherMousePointerClick } from "@subframe/core";
import { FeatherNavigation } from "@subframe/core";
import { FeatherRoute } from "@subframe/core";
import { FeatherSettings } from "@subframe/core";
import { FeatherShieldCheck } from "@subframe/core";
import { FeatherUser } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { FeatherVolume2 } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { Avatar } from "../components/Avatar";
import { DropdownMenu } from "../components/DropdownMenu";
import { IconButton } from "../components/IconButton";
import { SidebarWithSections } from "../components/SidebarWithSections";
import * as SubframeUtils from "../utils";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLDivElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-screen items-start bg-default-background overflow-hidden w-screen",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <SidebarWithSections
        className="mobile:hidden"
        header={
          <img
            className="h-6 flex-none object-cover"
            src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
          />
        }
        footer={
          <>
            <div className="flex grow shrink-0 basis-0 items-start gap-2">
              <Avatar image="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg">
                A
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-caption-bold font-caption-bold text-default-font">
                  Irvin
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Founder
                </span>
              </div>
            </div>
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <IconButton size="small" icon={<FeatherMoreHorizontal />} />
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem icon={<FeatherUser />}>
                      Profile
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={<FeatherSettings />}>
                      Settings
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={<FeatherLogOut />}>
                      Log out
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </>
        }
      >
        <SidebarWithSections.NavItem icon={<FeatherZap />}>
          Dashboard
        </SidebarWithSections.NavItem>
        <SidebarWithSections.NavItem icon={<FeatherNavigation />}>
          Areas
        </SidebarWithSections.NavItem>
        <SidebarWithSections.NavItem icon={<FeatherBusFront />}>
          Bus Depots
        </SidebarWithSections.NavItem>
        <SidebarWithSections.NavItem icon={<FeatherRoute />}>
          Routes
        </SidebarWithSections.NavItem>
        <SidebarWithSections.NavItem icon={<FeatherMapPin />}>
          Stops
        </SidebarWithSections.NavItem>
        <SidebarWithSections.NavItem icon={<FeatherVolume2 />}>
          Slogans
        </SidebarWithSections.NavItem>
        <SidebarWithSections.NavSection label="Admin">
          <SidebarWithSections.NavItem icon={<FeatherLandmark />}>
            Organizations
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem icon={<FeatherUsers />}>
            Users
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem
            icon={<FeatherMousePointerClick />}
            selected={true}
          >
            Features
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem icon={<FeatherShieldCheck />}>
            Roles
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem icon={<FeatherFileType />}>
            Fonts
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem icon={<FeatherHeadset />}>
            Support
          </SidebarWithSections.NavItem>
          <SidebarWithSections.NavItem icon={<FeatherSettings />}>
            Settings
          </SidebarWithSections.NavItem>
        </SidebarWithSections.NavSection>
      </SidebarWithSections>
      {children ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto overflow-auto">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
