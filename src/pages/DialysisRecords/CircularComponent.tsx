import useCountdown from "@/hooks/UseCountDown";
import React from "react";
import CircularProgress from "./CircularProgress";

interface CircularCountdownProps {
  startedAt: string | Date;
  hours: number;
  minutes: number;
  size?: number;       // diameter of circle
  strokeWidth?: number; // thickness of ring
}

export default function CircularCountdown({
  startedAt,
  hours,
  minutes,
  size = 150,
  strokeWidth = 12,
}: CircularCountdownProps) {
  const { hours: h, minutes: m, seconds: s, progress, isOver } =
    useCountdown(startedAt, hours, minutes);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
 
    <div className="flex  items-end gap-1">
    <h1 className='text-2xl font-bold text-amber-300'>  {`${h}:${String(m).padStart(2, "0")}`}  </h1>
    <span className='text-muted-foreground font-medium text-xs mb-1'>Min</span>
    </div>
          
        
    
  );
}

