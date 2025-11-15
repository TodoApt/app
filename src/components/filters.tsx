"use client";

import { Input } from "@/components/ui/input";
import { AutoComplete } from "@/components/ui/auto-complete";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Property, User } from "@/app/lib/schema";
import { useQueryStates, parseAsString, debounce, parseAsIsoDate } from "nuqs";

const DEFAULT_FILTERS = {
  search: "",
  status: "",
  propertyId: "",
  priority: "",
  assignedTo: "",
  dueDate: null,
  completedDate: null,
} as const;

export const Filters = ({
  properties,
  users,
  isAdmin,
}: {
  properties: Property[];
  users: User[];
  isAdmin: boolean;
}) => {
  const t = useTranslations();

  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
      status: parseAsString.withDefault(""),
      propertyId: parseAsString.withDefault(""),
      priority: parseAsString.withDefault(""),
      assignedTo: parseAsString.withDefault(""),
      dueDate: parseAsIsoDate,
      completedDate: parseAsIsoDate,
    },
    {
      shallow: false,
    },
  );

  const handleChangeFilter = async (name: string, value: any) => {
    await setFilters({ [name]: value ?? "" });
  };

  const handleClearFilters = async () => {
    await setFilters({
      search: "",
      status: "",
      propertyId: "",
      priority: "",
      assignedTo: "",
      dueDate: null,
      completedDate: null,
    });
  };

  const numFilters = useMemo(
    () =>
      Object.entries(filters).filter(
        ([key, value]) =>
          value !== DEFAULT_FILTERS[key as keyof typeof DEFAULT_FILTERS],
      ).length,
    [filters],
  );

  return (
    <div className={"mb-4 flex flex-col gap-4"}>
      <div className={"flex gap-2 items-center"}>
        <Input
          placeholder={t("Shared.search")}
          value={filters.search}
          onChange={(e) =>
            setFilters(
              {
                search: e.target.value,
              },
              {
                limitUrlUpdates:
                  e.target.value === "" ? undefined : debounce(500),
              },
            )
          }
        />

        <Button
          className={"h-8 w-8 relative"}
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <Filter />
          {numFilters > 0 && (
            <span
              className={"absolute bottom-[2px] right-1 text-xs sm:text-[6px]"}
            >
              {numFilters}
            </span>
          )}
        </Button>

        <Button
          variant="secondary"
          className={"h-8 w-8"}
          onClick={handleClearFilters}
        >
          <X />
        </Button>
      </div>

      {open && (
        <div
          className={
            "flex flex-col sm:flex-row gap-4 border rounded-md border-gray-200 hover:shadow-sm p-3 items-center"
          }
        >
          <div className={"flex flex-col gap-2 flex-1 w-full"}>
            <div>
              <Label>{t("Tasks.status")}</Label>
            </div>
            <AutoComplete
              value={filters.status}
              options={[
                {
                  value: "pending",
                  label: t("Tasks.statusPending"),
                },
                {
                  value: "pending_assign",
                  label: t("Tasks.pendingAssign"),
                },
                {
                  value: "in_progress",
                  label: t("Tasks.statusInProgress"),
                },
                {
                  value: "completed",
                  label: t("Tasks.statusCompleted"),
                },
              ]}
              placeholder={t("Tasks.selectStatus")}
              onChange={(value) => handleChangeFilter("status", value)}
            />
          </div>

          <div className={"flex flex-col gap-2 flex-1 w-full"}>
            <div>
              <Label>{t("Tasks.property")}</Label>
            </div>
            <AutoComplete
              placeholder={t("Tasks.selectProperty")}
              options={properties.map((property) => ({
                value: property.id,
                label: property.name,
              }))}
              onChange={(value) => handleChangeFilter("propertyId", value)}
              value={filters.propertyId}
            />
          </div>

          <div className={"flex flex-col gap-2 flex-1 w-full"}>
            <div>
              <Label>{t("Tasks.priority")}</Label>
            </div>
            <AutoComplete
              placeholder={t("Tasks.selectPriority")}
              options={[
                {
                  value: "low",
                  label: t("Tasks.priorityLow"),
                },
                {
                  value: "medium",
                  label: t("Tasks.priorityMedium"),
                },
                {
                  value: "high",
                  label: t("Tasks.priorityHigh"),
                },
              ]}
              onChange={(value) => handleChangeFilter("priority", value)}
              value={filters.priority}
            />
          </div>

          {isAdmin && (
            <div className={"flex flex-col gap-2 flex-1 w-full"}>
              <div>
                <Label>{t("Tasks.assignedTo")}</Label>
              </div>
              <AutoComplete
                placeholder={t("Tasks.selectAssignedTo")}
                options={users.map((user) => ({
                  value: user.id,
                  label: `${user.firstName} ${user.lastName}`,
                }))}
                onChange={(value) => handleChangeFilter("assignedTo", value)}
                value={filters.assignedTo}
              />
            </div>
          )}

          <div className={"flex flex-col gap-2 flex-1 w-full"}>
            <div>
              <Label>{t("Tasks.taskDueDate")}</Label>
            </div>
            <DatePicker
              onChange={(value) => handleChangeFilter("dueDate", value)}
              value={filters.dueDate}
              placeholder={t("Tasks.selectDueDate")}
            />
          </div>
          <div className={"flex flex-col gap-2 flex-1 w-full"}>
            <div>
              <Label>{t("Tasks.taskCompletedDate")}</Label>
            </div>
            <DatePicker
              onChange={(value) => handleChangeFilter("completedDate", value)}
              value={filters.completedDate}
              placeholder={t("Tasks.selectCompletedDate")}
            />
          </div>
        </div>
      )}
    </div>
  );
};
