import { useEffect, useState } from "react";
import { add, intervalToDuration, differenceInMilliseconds } from "date-fns";

interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
  isOver: boolean;
  progress: number;   // 0 to 100
  elapsedMs: number;  // how much time passed
  totalMs: number;    // total duration
}

function useCountdown(startedAt: string | Date, hours: number, minutes: number): Countdown {
  const [state, setState] = useState<Countdown>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    formatted: "Calculating...",
    isOver: false,
    progress: 0,
    elapsedMs: 0,
    totalMs: 0,
  });

  useEffect(() => {
    const start = new Date(startedAt);
    const endTime = add(start, { hours, minutes });
    const totalMs = differenceInMilliseconds(endTime, start);

    function update() {
      const now = new Date();
      const remainingMs = differenceInMilliseconds(endTime, now);
      const elapsedMs = totalMs - remainingMs;

      if (remainingMs <= 0) {
        setState({
          hours: 0,
          minutes: 0,
          seconds: 0,
          formatted: "Time over",
          isOver: true,
          progress: 100,
          elapsedMs: totalMs,
          totalMs,
        });
        return;
      }

      const duration = intervalToDuration({ start: now, end: endTime });
      const h = duration.hours ?? 0;
      const m = duration.minutes ?? 0;
      const s = duration.seconds ?? 0;

      const progress = Math.min(100, (elapsedMs / totalMs) * 100);

      setState({
        hours: h,
        minutes: m,
        seconds: s,
        formatted: `${h}h ${m}m ${s}s left`,
        isOver: false,
        progress,
        elapsedMs,
        totalMs,
      });
    }

    update(); // run immediately
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [startedAt, hours, minutes]);

  return state;
}

export default useCountdown;
