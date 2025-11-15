import { getProperties, getTask, getUsers } from "@/app/lib/data";
import { notFound } from "next/navigation";
import UpdateTaskForm from "@/components/tasks/edit-task";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [task, properties, users] = await Promise.all([
    getTask(id),
    getProperties(),
    getUsers(),
  ]);

  if (!task) {
    return notFound();
  }

  return <UpdateTaskForm task={task} properties={properties} users={users} />;
}
