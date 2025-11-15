"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getStatusMap } from "@/components/tasks/task";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { TaskStatusEnum } from "@/app/lib/schema";
import { changeTaskStatus } from "@/app/lib/actions";
import { startTransition } from "react";

export const StatusChanger = ({
  status,
  id,
}: {
  id: string;
  status: TaskStatusEnum;
}) => {
  const t = useTranslations();
  const statusMap = getStatusMap(t);

  const handleStatusChange = (statusOption: TaskStatusEnum) => {
    startTransition(async () => {
      await changeTaskStatus(id, statusOption);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{t("Tasks.status")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"start"}>
        {Object.keys(statusMap).map((statusOption) => (
          <DropdownMenuCheckboxItem
            checked={status === statusOption}
            key={statusOption}
            onCheckedChange={() =>
              handleStatusChange(statusOption as TaskStatusEnum)
            }
          >
            {statusMap[statusOption as TaskStatusEnum]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
