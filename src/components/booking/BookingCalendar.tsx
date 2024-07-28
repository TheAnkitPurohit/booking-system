"use client";

import { useState, useEffect } from "react";
import { useProperty } from "@/utils/store";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import {
  defaultSelected,
  generateDateRange,
  generateDisabledDates,
  generateBlockedPeriods,
} from "@/utils/calendar";

function BookingCalendar() {
  const currentDate = new Date();

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const bookings = useProperty((state) => state.bookings);
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });
  const { toast } = useToast();
  const unavailableDates = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected);
        toast({
          description: "Some dates are booked. Please select again.",
        });
        return true;
      }
      return false;
    });
    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      // add disabled
      disabled={blockedPeriods}
    />
  );
}
export default BookingCalendar;
