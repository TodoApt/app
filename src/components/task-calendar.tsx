"use client";

import { useRouter } from "next/navigation";
import { TaskEvent } from "@/app/lib/schema";
import { useState, useEffect } from "react";
import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
  Feature,
  useCalendarMonth,
  useCalendarYear,
} from "@/components/ui/shadcn-io/calendar";
import { addYears, subYears } from "date-fns";
import { useTranslations } from "next-intl";

export default function TaskCalendar() {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [month] = useCalendarMonth();
  const [year] = useCalendarYear();
  const t = useTranslations();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0);

        const response = await fetch(
          `/api/calendar?start=${start.toISOString()}&end=${end.toISOString()}`,
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [month, year]);

  const handleEventClick = (info: Feature) => {
    router.push(`/calendar/edit/${info.id}`);
  };

  const priorityMap = {
    high: { id: "high", name: t("Tasks.priorityHigh"), color: "#cc0808" },
    medium: { id: "medium", name: t("Tasks.priorityMedium"), color: "#ffb617" },
    low: { id: "low", name: t("Tasks.priorityLow"), color: "#10B981" },
  };

  const calendarFeatures = tasks.map((task) => ({
    id: task.taskId,
    name: task.title,
    startAt: new Date(task.start),
    endAt: new Date(task.start),
    status: priorityMap[task.priority],
  }));

  const earliestYear = subYears(new Date(), 2).getFullYear();
  const latestYear = addYears(new Date(), 2).getFullYear();

  if (isLoading) {
    return null;
  }

  return (
    <CalendarProvider
      locale="en-US"
      minYear={earliestYear}
      maxYear={latestYear}
    >
      <CalendarDate>
        <CalendarDatePicker>
          <CalendarMonthPicker />
          <CalendarYearPicker className={"w-30"} />
        </CalendarDatePicker>
        <CalendarDatePagination />
      </CalendarDate>

      <CalendarHeader />
      <CalendarBody features={calendarFeatures}>
        {({ feature }) => (
          <CalendarItem
            feature={feature}
            key={feature.id}
            onClick={handleEventClick}
          />
        )}
      </CalendarBody>
    </CalendarProvider>
  );
}
