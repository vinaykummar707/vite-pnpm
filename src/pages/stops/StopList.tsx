import React from "react";
import { useSubscription } from "@apollo/client";
import { GET_ALL_STOPS } from "@/gql/stops.gql";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Pin } from "lucide-react";
import TabsComponent from "@/components/comp-437";
import RegionalAudioAccordion from "@/pages/stops/RegionalAudioAccordion";
import { GET_STOP_AUDIOS_BY_STOP_ID_AND_CATEGORY } from "@/gql/stop_audios.gql";

const googleMapsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

const StopList: React.FC = () => {
  const { data, loading, error } = useSubscription(GET_ALL_STOPS);

  if (loading) return <div>Loading stops...</div>;
  if (error) return <div>Error loading stops: {error.message}</div>;

  return (
    <div className="mt-6 ">
      <h2 className="text-lg font-semibold mb-4">All Stops</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {data?.stops?.map((stop: any) => (
          <AccordionItem
            value={String(stop.id)}
            key={stop.id}
            className="bg-card  rounded-md border px-4 py-1 outline-none "
          >
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
              {stop.name}
            </AccordionTrigger>
            <AccordionContent className=" pb-2">
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <Card className="">
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold ">Up Coordinates</div>
                      <div className="flex text-muted-foreground text-xs gap-4 ">
                        <span>
                          Latitude:{" "}
                          <span className="font-mono">{stop.up_latitude}</span>
                        </span>

                        <span>
                          Longitude:{" "}
                          <span className="font-mono">{stop.up_longitude}</span>
                        </span>
                      </div>
                    </div>

                    <Button asChild variant="outline" size="sm" className="">
                      <a
                        href={googleMapsUrl(
                          stop.up_latitude,
                          stop.up_longitude
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Google Maps
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <div className="font-semibold mb-2">Down Coordinates</div>
                    <div className="flex text-muted-foreground  gap-4 mb-3">
                      <span>
                        Latitude:{" "}
                        <span className="font-mono">{stop.down_latitude}</span>
                      </span>
                      <span>
                        Longitude:{" "}
                        <span className="font-mono">{stop.down_longitude}</span>
                      </span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="">
                      <a
                        href={googleMapsUrl(
                          stop.down_latitude,
                          stop.down_longitude
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Google Maps
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-4">
                <CardContent className="space-y-4">
                  <h1>Audio Announcements</h1>
                  <Tabs defaultValue="account" className=" ">
                    <TabsList>
                      <TabsTrigger value="current">Current Stop</TabsTrigger>
                      <TabsTrigger value="next">Next Stop</TabsTrigger>
                      <TabsTrigger value="arriving">Arriving Stop</TabsTrigger>
                    </TabsList>
                    <TabsContent value="current">
                      <RegionalAudioAccordion
                        category="current"
                        stopId={stop.id}
                        key={stop.id}
                      />
                    </TabsContent>
                    <TabsContent value="next">
                      Change your password here.
                    </TabsContent>
                    <TabsContent value="arriving">
                      Change your password here.
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default StopList;
