"use client";
/*
 * Documentation:
 * Line Chart — https://app.subframe.com/74c5de8a4438/library?component=Line+Chart_22944dd2-3cdd-42fd-913a-1b11a3c1d16d
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface LineChartRootProps
  extends React.ComponentProps<typeof SubframeCore.LineChart> {
  className?: string;
}

const LineChartRoot = React.forwardRef<
  React.ElementRef<typeof SubframeCore.LineChart>,
  LineChartRootProps
>(function LineChartRoot(
  { className, ...otherProps }: LineChartRootProps,
  ref
) {
  return (
    <SubframeCore.LineChart
      className={SubframeUtils.twClassNames("h-80 w-full", className)}
      ref={ref}
      colors={[
        "#84cc16",
        "#d9f99d",
        "#65a30d",
        "#bef264",
        "#4d7c0f",
        "#a3e635",
      ]}
      {...otherProps}
    />
  );
});

export const LineChart = LineChartRoot;
