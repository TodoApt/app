import React from "react";
import { TaskAssistant } from "@/components/task-assistant";
import TasksList from "@/components/tasks/tasks-list";
import { getTasks } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function Tasks({
  query,
}: {
  query: Record<string, string>;
}) {
  const tasks = await getTasks(query);

  const session = await auth();
  const isAdmin = session?.user?.type === "admin" || false;

  return (
    <div>
      <TasksList tasks={tasks.data} isAdmin={isAdmin} />
      <TaskAssistant />
    </div>
  );
}
