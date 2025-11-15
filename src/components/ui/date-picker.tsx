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
import { format } from "date-fns";

export const DatePicker = ({
  value,
  onChange,
  placeholder,
}: {
  value: Date | null;
  onChange: (value: Date | null) => void;
  placeholder?: string | React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal dark:bg-input/30",
            !value && "text-muted-foreground",
          )}
        >
          {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? value : undefined}
          onSelect={(value) => {
            onChange(value ? value : null);
            setOpen((prev) => !prev);
          }}
          disabled={(date) => date < new Date("1900-01-01")}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
};
