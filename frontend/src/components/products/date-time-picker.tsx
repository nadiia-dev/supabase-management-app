"use client";

import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useFilterContext } from "@/context/filters-context";
import { DateRange } from "react-day-picker";

const DateTimePicker = ({ id }: { id: string }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const { columnFilters, setFilterValue } = useFilterContext();
  const dateFilter = columnFilters.find((filter) => filter.id === id);

  const selectedDate = dateFilter?.value || "";

  const toggleDate = (date: DateRange) => {
    const newDate = selectedDate === date ? null : date;

    setFilterValue("date", newDate ? newDate : "");
  };

  useEffect(() => {
    if (date) {
      toggleDate(date);
    }
  }, [date]);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateTimePicker;
