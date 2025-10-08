"use client";

import React from "react";
import { Checkbox } from "@/ui/components/Checkbox";
import { RouteCreationLeftPanel } from "@/ui/components/RouteCreationLeftPanel";
import { Select } from "@/ui/components/Select";
import { Switch } from "@/ui/components/Switch";
import { TextField } from "@/ui/components/TextField";
import {Controller, useFormContext} from "react-hook-form";

function RouteCreationLeftPanelExample() {

    const {register, watch, control} = useFormContext();

    let route = watch('route')

    console.log("route", route);


  return (
      <RouteCreationLeftPanel
          routeFields={
              <div className="flex w-full flex-col items-start gap-4">
                  {!route.splitRoute && <TextField variant="filled" label="Route Number" helpText="">
                      <TextField.Input
                          placeholder="ex:300 or 35A/251"
                          {...register('route.routeNumber')}
                      />
                  </TextField>}
                  {route.splitRoute && <>
                      <TextField variant="filled" label="Route Number 1" helpText="">
                          <TextField.Input
                              placeholder="ex:300 or 35A/251"

                          />
                      </TextField>
                      <TextField variant="filled" label="Route Number 2" helpText="">
                          <TextField.Input
                              placeholder="ex:300 or 35A/251"

                          />
                      </TextField>
                  </>}

                  <TextField
                      className="h-auto w-full flex-none"
                      variant="filled"
                      label="Source"
                      helpText=""
                  >
                      <TextField.Input
                          placeholder="ex: UPPAL"

                      />
                  </TextField>
                  <TextField
                      className="h-auto w-full flex-none"
                      variant="filled"
                      label="Destination"
                      helpText=""
                  >
                      <TextField.Input
                          placeholder="ex: SECBAD"

                      />
                  </TextField>
                  <TextField
                      className="h-auto w-full flex-none"
                      variant="filled"
                      label="Via"
                      helpText=""
                  >
                      <TextField.Input
                          placeholder="ex: NAGOLE-LBNAGAR"

                      />
                  </TextField>
                  <div className="flex w-full flex-col items-start gap-1">
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    Campaign Type
                  </span>
                      <Select
                          className="h-auto w-full flex-none"
                          variant="filled"
                          label=""
                          placeholder="Select"
                          helpText=""

                      >
                          <Select.Item value="To">To</Select.Item>
                          <Select.Item value="Dash">Dash</Select.Item>
                          <Select.Item value="Vice Verca">Vice Verca</Select.Item>
                      </Select>
                  </div>
              </div>
          }
          languageList={
              <div className="flex w-full flex-col items-start gap-2">
                  <div className="flex w-full flex-col items-start gap-2">
                      <Checkbox
                          label="English"
                          checked={false}
                          onCheckedChange={(checked: boolean) => {}}
                      />
                      <Checkbox
                          label="Hindi"
                          checked={false}
                          onCheckedChange={(checked: boolean) => {}}
                      />
                      <Checkbox
                          label="Telugu"
                          checked={false}
                          onCheckedChange={(checked: boolean) => {}}
                      />
                  </div>
                  <span className="text-caption font-caption text-subtext-color" />
              </div>
          }
          splitRouteSwitch={
              <Controller
                  name="route.splitRoute"
                  control={control}
                  render={({ field }) => (
                      <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                      />
                  )}
              />
          }
      />
  );
}

export default RouteCreationLeftPanelExample;