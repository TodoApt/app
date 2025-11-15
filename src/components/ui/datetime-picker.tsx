import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format, parseISO, setHours, setMinutes } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DateTimePicker = ({
  name,
  id,
  placeholder,
  value,
  onChange,
}: {
  name: string;
  id: string;
  placeholder?: string | React.ReactNode;
  description?: string | React.ReactNode;
  value: string;
  onChange?: (value: Date | null) => void;
}) => {
  const [date, setDate] = useState<Date | null>(value ? parseISO(value) : null);
  const [open, setOpen] = useState(false);
  const hour = date ? format(date, "HH") : "09";
  const minute = date ? format(date, "mm") : "00";

  return (
    <div>
      <input
        type={"hidden"}
        id={id}
        name={name}
        value={date ? date.toISOString() : ""}
      />

      <Popover modal={true} open={open} onOpenChange={setOpen}>
        <div className={"flex gap-2"}>
          <PopoverTrigger asChild>
            <Button
              type={"button"}
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal dark:bg-input/30",
                !date && "text-muted-foreground",
              )}
            >
              {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <Select
            onValueChange={(val) => {
              const result = date ? setHours(date, parseInt(val)) : date;

              setDate(result);

              if (onChange) {
                onChange(result);
              }
            }}
            value={hour}
            disabled={!date}
          >
            <SelectTrigger>
              <SelectValue placeholder="09" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 15 }, (_, i) =>
                (i + 8).toString().padStart(2, "0"),
              ).map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) => {
              const result = date ? setMinutes(date, parseInt(val)) : date;

              setDate(result);
              if (onChange) {
                onChange(result);
              }
            }}
            value={minute}
            disabled={!date}
          >
            <SelectTrigger>
              <SelectValue placeholder="00" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) =>
                (i * 5).toString().padStart(2, "0"),
              ).map((min) => (
                <SelectItem key={min} value={min}>
                  {min}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={(value) => {
              if (value) {
                const date = new Date(value);
                date.setHours(9, 0, 0, 0);
                setDate(date);

                if (onChange) {
                  onChange(date);
                }
              } else {
                setDate(null);
                if (onChange) {
                  onChange(null);
                }
              }
              setOpen((prev) => !prev);
            }}
            disabled={(date) => date < new Date("1900-01-01")}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
