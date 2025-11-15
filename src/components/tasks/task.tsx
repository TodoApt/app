import { getFileKey, getPreview } from "@/utils/file";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Calendar,
  CalendarPlus,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  ListCheck,
  Map,
  User,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { StatusChanger } from "@/components/tasks/status-changer";
import { PopulatedTask } from "@/app/lib/schema";
import { DeleteTask } from "@/components/tasks/delete-task";

export const getStatusMap = (t: ReturnType<typeof useTranslations>) => ({
  pending: t("Tasks.statusPending"),
  in_progress: t("Tasks.statusInProgress"),
  completed: t("Tasks.statusCompleted"),
});

const getPriorityMap = (t: ReturnType<typeof useTranslations>) => ({
  low: t("Tasks.priorityLow"),
  medium: t("Tasks.priorityMedium"),
  high: t("Tasks.priorityHigh"),
});

const getAvailabilityMap = (t: ReturnType<typeof useTranslations>) => ({
  available: t("Tasks.availabilityAvailable"),
  checkin_checkout: t("Tasks.availabilityCheckinCheckout"),
  checkin: t("Tasks.availabilityCheckin"),
  checkout: t("Tasks.availabilityCheckout"),
  unavailable: t("Tasks.availabilityUnavailable"),
});

export const TaskItem = ({
  task,
  handleViewerOpen,
  isAdmin,
}: {
  task: PopulatedTask;
  handleViewerOpen: (files: string[], index: number) => void;
  isAdmin: boolean;
}) => {
  const t = useTranslations();

  const [open, setOpen] = useState<boolean>(false);
  const statusMap = getStatusMap(t);
  const priorityMap = getPriorityMap(t);
  const availabilityMap = getAvailabilityMap(t);

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div
      className="p-3 border rounded-md border-gray-200 bg-muted hover:shadow-sm"
      key={task.id}
    >
      <div
        className={"flex justify-between cursor-pointer"}
        onClick={toggleOpen}
      >
        <h3 className="font-medium text-gray-800 dark:text-gray-100">
          {task.title}
        </h3>

        <div>{!open ? <ChevronDown /> : <ChevronUp />}</div>
      </div>

      <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100">
        {task.propertyName}
      </h2>

      {open && (
        <div className="flex flex-col gap-1">
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 mb-2">
            {task.content}
          </p>

          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1">
            <CalendarPlus size={16} />
            {format(task.createdAt, "dd/MM/yyyy HH:mm")}{" "}
            {task.dueDate && (
              <>
                ({t("Tasks.dueDate")} {format(task.dueDate, "dd/MM/yyyy HH:mm")}
                )
              </>
            )}
          </h2>

          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1">
            <CircleAlert size={16} /> {priorityMap[task.priority]}
          </h2>

          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1">
            <User size={16} />
            {task.assignedToName ? task.assignedToName : t("Tasks.unassigned")}
          </h2>

          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1">
            <Map size={16} />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={
                "http://maps.google.com/?daddr=" +
                encodeURI(task.propertyAddress)
              }
            >
              {task.propertyAddress}, {task.propertyFloor} - {task.propertyDoor}
            </a>
          </h2>

          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1">
            <ListCheck size={16} /> {statusMap[task.status]}
          </h2>

          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1">
            <Calendar size={16} /> {availabilityMap[task.availability]}
          </h2>

          {task.notes && (
            <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1 p-2 rounded border border-gray-400 dark:border-gray-200 border-dashed">
              {t("Task.notes")}: {task.notes}
            </p>
          )}

          {task.propertyNotes && (
            <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1 p-2 rounded border border-gray-400 dark:border-gray-200 border-dashed">
              {t("Task.propertyNotes")}: {task.propertyNotes}
            </p>
          )}

          {task.files && task.files.length > 0 && (
            <div className={"mt-4 flex flex-wrap gap-4"}>
              {task.files.map((file, index) => (
                <div
                  key={getFileKey(file)}
                  className={"h-24 w-24"}
                  onClick={() => handleViewerOpen(task.files, index)}
                >
                  <img
                    src={getPreview(file)}
                    alt={"File"}
                    className={"w-full h-full rounded-xl"}
                  />
                </div>
              ))}
            </div>
          )}

          <div className={"flex gap-2 mt-2"}>
            <StatusChanger status={task.status} id={task.id} />

            <Link href={`/edit/${task.id}`}>
              <Button>{t("Shared.edit")}</Button>
            </Link>
            {isAdmin && <DeleteTask id={task.id} />}
          </div>
        </div>
      )}
    </div>
  );
};
