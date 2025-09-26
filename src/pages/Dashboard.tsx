import React from "react";
import { Accordion } from "@/ui/components/Accordion";
import { Button } from "@/ui/components/Button";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { StopListItem } from "@/ui/components/StopListItem";
import { Tabs } from "@/ui/components/Tabs";
import { UpCoordinatesCard } from "@/ui/components/UpCoordinatesCard";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherChevronsDown } from "@subframe/core";
import { FeatherChevronsUp } from "@subframe/core";
import { FeatherMapPin } from "@subframe/core";
import { FeatherNavigation } from "@subframe/core";
import { FeatherPen } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import { useAuth } from "@/providers/AuthProvider"
import type { User } from "@supabase/supabase-js";



export default function Dashboard() {

    const auth = useAuth();
    const user = auth?.user as User | null;

    if (user) {
      const {
        id,
        email,
        created_at,
        user_metadata: { full_name = '', avatar_url = '' } = {},
      } = user
    
      console.log("User ID:", id)
      console.log("Email:", email)
      console.log("Name:", full_name)
      console.log("Avatar:", avatar_url)
      console.log("c:", created_at)
    }
 
    
    
    return (
     <div className="flex h-full w-full flex-col items-center gap-4 bg-default-background px-12 py-12">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start rounded-md border border-solid border-neutral-border">
            <Accordion
              trigger={
                <div className="flex w-full items-center gap-4 px-4 py-4">
                  <IconWithBackground
                    size="medium"
                    icon={<FeatherMapPin />}
                    square={true}
                  />
                  <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                    Kushaiguda
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      disabled={false}
                      variant="neutral-secondary"
                      size="medium"
                      icon={<FeatherPen />}
                      iconRight={null}
                      loading={false}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
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
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Delete
                    </Button>
                  </div>
                  <Accordion.Chevron />
                </div>
              }
              defaultOpen={true}
            >
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 border-t border-solid border-neutral-border bg-neutral-50 px-6 pt-4 pb-6">
                <span className="text-body-bold font-body-bold text-subtext-color">
                  Co-ordinates
                </span>
                <div className="flex w-full flex-col items-start gap-2">
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
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        Navigate
                      </Button>
                    }
                  />
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
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        Navigate
                      </Button>
                    }
                  />
                </div>
                <span className="text-body-bold font-body-bold text-subtext-color">
                  Stop Announcements
                </span>
                <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                  <Tabs>
                    <Tabs.Item active={true}>Tab</Tabs.Item>
                    <Tabs.Item active={false}>Tab</Tabs.Item>
                    <Tabs.Item>Tab</Tabs.Item>
                  </Tabs>
                  <StopListItem />
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }