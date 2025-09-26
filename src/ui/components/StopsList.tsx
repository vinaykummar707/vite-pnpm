"use client";
/*
 * Documentation:
 * AnnouncementListItem — https://app.subframe.com/74c5de8a4438/library?component=AnnouncementListItem_0cadf87e-2fce-4f43-b19d-412117240580
 * Button — https://app.subframe.com/74c5de8a4438/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * StopListItem — https://app.subframe.com/74c5de8a4438/library?component=StopListItem_8aeeba27-2b7f-48cd-b822-db04a4fd2e6b
 * StopsList — https://app.subframe.com/74c5de8a4438/library?component=StopsList_8bb0292e-f587-498e-b19b-876199fbb718
 * Tabs — https://app.subframe.com/74c5de8a4438/library?component=Tabs_e1ad5091-8ad8-4319-b1f7-3e47f0256c20
 * UpCoordinatesCard — https://app.subframe.com/74c5de8a4438/library?component=UpCoordinatesCard_be50282c-ace5-47fc-a22b-2923654c40ee
 */

import React from "react";
import { FeatherChevronsDown } from "@subframe/core";
import { FeatherChevronsUp } from "@subframe/core";
import { FeatherNavigation } from "@subframe/core";
import { FeatherPen } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { AnnouncementListItem } from "./AnnouncementListItem";
import { Button } from "./Button";
import { StopListItem } from "./StopListItem";
import { Tabs } from "./Tabs";
import { UpCoordinatesCard } from "./UpCoordinatesCard";

interface StopsListRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const StopsListRoot = React.forwardRef<HTMLDivElement, StopsListRootProps>(
  function StopsListRoot(
    { className, ...otherProps }: StopsListRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-full flex-col items-start gap-2",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        <StopListItem
          locationName="Kushaiguda"
          actions={
            <>
              <Button
                disabled={false}
                variant="neutral-secondary"
                size="medium"
                icon={<FeatherPen />}
                iconRight={null}
                loading={false}
              >
                Edit
              </Button>
              <Button
                disabled={false}
                variant="neutral-secondary"
                size="medium"
                icon={<FeatherTrash />}
                iconRight={null}
                loading={false}
              >
                Delete
              </Button>
            </>
          }
          upCoordinates={
            <UpCoordinatesCard
              icon={<FeatherChevronsUp />}
              title="Up Locations"
              latitude="Lat : 12.889932"
              longitude="Lng: 23.2313123"
              navigationButton={
                <Button
                  disabled={false}
                  variant="brand-tertiary"
                  size="medium"
                  icon={<FeatherNavigation />}
                  iconRight={null}
                  loading={false}
                >
                  Navigate
                </Button>
              }
            />
          }
          downCoordinates={
            <UpCoordinatesCard
              icon={<FeatherChevronsDown />}
              title="Down Locations"
              latitude="Lat : 12.889932"
              longitude="Lng: 23.2313123"
              navigationButton={
                <Button
                  disabled={false}
                  variant="brand-tertiary"
                  size="medium"
                  icon={<FeatherNavigation />}
                  iconRight={null}
                  loading={false}
                >
                  Navigate
                </Button>
              }
            />
          }
          tabsAndAnnouncements={
            <>
              <Tabs>
                <Tabs.Item active={true}>Tab</Tabs.Item>
                <Tabs.Item active={false}>Tab</Tabs.Item>
                <Tabs.Item>Tab</Tabs.Item>
              </Tabs>
              <AnnouncementListItem language="English" />
            </>
          }
        />
      </div>
    );
  }
);

export const StopsList = StopsListRoot;
