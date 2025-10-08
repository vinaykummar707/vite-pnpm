
import { RouteCreationHeader } from "@/ui/components/RouteCreationHeader";
import { RouteCreationLeftPanel } from "@/ui/components/RouteCreationLeftPanel";
import RouteCreationLeftPanelComponent from "@/pages/Routes/RouteCreation/RouteCreationLeftPanelComponent.tsx";
import {Checkbox, Select, Switch, TextField} from "@/ui";
import React from "react";

export default function RouteCreationLayout() {
    return (
        <div className="flex h-screen w-screen flex-col items-start gap-1 bg-neutral-100">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 h-screen w-screen overflow-hidden">
                <RouteCreationHeader className="h-12 w-full flex-none" />
                <div className="flex w-full grow shrink-0 basis-0 items-start">
                    <RouteCreationLeftPanelComponent/>
                    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 self-stretch px-2 py-2" />
                    <div className="flex w-64 flex-none flex-col items-start gap-2 self-stretch px-4 pb-4" />
                </div>
            </div>
        </div>
    );
}

