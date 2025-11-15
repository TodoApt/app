import { getTask, getUsers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import AssignTaskFormModal from "@/components/tasks/assign-task-modal";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [task, users] = await Promise.all([getTask(id), getUsers()]);

  if (!task) {
    return notFound();
  }

  return <AssignTaskFormModal task={task} users={users} />;
}
