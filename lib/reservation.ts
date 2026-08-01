import "server-only";
import { createClient } from "@supabase/supabase-js";
import { DayHours } from "./opening-hours";

export type DayServices = { lunchOpen: boolean; dinnerOpen: boolean };

export type ReservationConfig = {
  closedWeekdays: number[];
  closedDates: string[];
  holidayPeriods: { debut: string; fin: string }[];
  timeSlots: string[];
  lunchSlots: string[];
  dinnerSlots: string[];
  // Indexed by JS Date.getDay() (0=Sun…6=Sat).
  dayServices: DayServices[];
};

// DAYS_FR index (0=Lundi…6=Dimanche) → JS Date.getDay() (0=Sun, 1=Mon…6=Sat)
const DAYS_FR_TO_JS: Record<number, number> = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 0,
};

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function generateSlots(debut: string, fin: string): string[] {
  const slots: string[] = [];
  const start = timeToMinutes(debut);
  const end = timeToMinutes(fin);
  for (let t = start; t <= end; t += 30) {
    slots.push(minutesToTime(t));
  }
  return slots;
}

export async function getReservationConfig(): Promise<ReservationConfig> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { global: { fetch: (url, opts) => fetch(url, { ...opts, cache: "no-store" }) } }
  );

  const restaurantId = process.env.RESTAURANT_ID!;

  const [hoursResult, closedDaysResult, holidaysResult] = await Promise.all([
    supabase.from("opening_hours").select("hours").eq("restaurant_id", restaurantId).single(),
    supabase.from("closed_days").select("days").eq("restaurant_id", restaurantId).single(),
    supabase.from("holidays").select("periods").eq("restaurant_id", restaurantId).single(),
  ]);

  const hours: DayHours[] | null = hoursResult.data?.hours ?? null;
  const closedDates: string[] = closedDaysResult.data?.days ?? [];
  const holidayPeriods: { debut: string; fin: string }[] = holidaysResult.data?.periods ?? [];

  const closedWeekdays: number[] = [];
  const lunchSet = new Set<string>();
  const dinnerSet = new Set<string>();
  // Indexed by JS getDay(); default open, overwritten per configured day below.
  const dayServices: DayServices[] = Array.from({ length: 7 }, () => ({
    lunchOpen: true,
    dinnerOpen: true,
  }));

  if (hours) {
    hours.forEach((day, index) => {
      const jsDay = DAYS_FR_TO_JS[index];
      if (day.closedDay) {
        closedWeekdays.push(jsDay);
        dayServices[jsDay] = { lunchOpen: false, dinnerOpen: false };
      } else {
        const lunchOpen = !day.closedLunch && !!day.midi?.debut && !!day.midi?.fin;
        const dinnerOpen = !day.closedDiner && !!day.soir?.debut && !!day.soir?.fin;
        dayServices[jsDay] = { lunchOpen, dinnerOpen };
        if (lunchOpen) generateSlots(day.midi.debut, day.midi.fin).forEach((s) => lunchSet.add(s));
        if (dinnerOpen) generateSlots(day.soir.debut, day.soir.fin).forEach((s) => dinnerSet.add(s));
      }
    });
  }

  const lunchSlots = Array.from(lunchSet).sort();
  const dinnerSlots = Array.from(dinnerSet).sort();
  const timeSlots = Array.from(new Set([...lunchSlots, ...dinnerSlots])).sort();

  return { closedWeekdays, closedDates, holidayPeriods, timeSlots, lunchSlots, dinnerSlots, dayServices };
}
