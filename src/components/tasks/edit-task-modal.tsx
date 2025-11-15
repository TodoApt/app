"use client";

import { updateTask } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import { PopulatedTask, Property, User } from "@/app/lib/schema";
import { useActionState, useMemo } from "react";
import { useTranslations } from "next-intl";
import FullScreenDialog from "@/components/full-screen-dialog";

export default function EditTaskFormModal({
  task,
  properties,
  users,
}: {
  task: PopulatedTask;
  properties: Property[];
  users: User[];
}) {
  const t = useTranslations("Tasks");
  const fields = useMemo(
    () => [
      {
        name: "propertyId",
        label: t("property"),
        type: "select",
        placeholder: "My apt",
        options: properties.map((property) => ({
          value: property.id,
          label: property.name,
        })),
      },
      {
        name: "title",
        label: t("title"),
        type: "input",
        placeholder: t("title"),
      },
      {
        name: "content",
        label: t("content"),
        type: "textarea",
        placeholder: t("title"),
      },
      {
        name: "assignedTo",
        label: t("assignedTo"),
        type: "select",
        placeholder: t("assignedTo"),
        options: users.map((user) => ({
          value: user.id,
          label: `${user.firstName} ${user.lastName}`,
        })),
      },
      {
        name: "status",
        label: t("status"),
        type: "select",
        placeholder: t("status"),
        options: [
          {
            value: "pending",
            label: t("statusPending"),
          },
          {
            value: "pending_assign",
            label: t("pendingAssign"),
          },
          {
            value: "in_progress",
            label: t("statusInProgress"),
          },
          {
            value: "completed",
            label: t("statusCompleted"),
          },
        ],
      },
      {
        name: "priority",
        label: t("priority"),
        type: "select",
        placeholder: t("priority"),
        options: [
          {
            value: "low",
            label: t("priorityLow"),
          },
          {
            value: "medium",
            label: t("priorityMedium"),
          },
          {
            value: "high",
            label: t("priorityHigh"),
          },
        ],
      },
      {
        name: "dueDate",
        label: t("dueDate"),
        type: "dateTimePicker",
        placeholder: t("dueDate"),
      },
      {
        name: "notes",
        label: t("notes"),
        type: "textarea",
        placeholder: t("notes"),
      },
      {
        name: "files",
        label: t("files"),
        type: "uploader",
      },
    ],
    [properties, t, users],
  );

  const updateTaskWithId = updateTask.bind(null, task.id);

  const [state, formAction, isPending] = useActionState(updateTaskWithId, {});

  return (
    <FullScreenDialog
      open={true}
      title={`${t("editTask")}`}
      actions={
        <Button
          type={"submit"}
          className={"mt-4 w-full"}
          disabled={isPending}
          form={"edit-task"}
        >
          {t("updateTask")}
        </Button>
      }
    >
      <form action={formAction} id={"edit-task"}>
        <FormGenerator
          fields={fields}
          errors={state.errors}
          values={task as Record<string, any>}
        />
      </form>
    </FullScreenDialog>
  );
}
