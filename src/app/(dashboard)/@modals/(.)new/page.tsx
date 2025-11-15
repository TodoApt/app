import CreateTaskFormModal from "@/components/tasks/create-task-modal";
import { getProperties, getUsers } from "@/app/lib/data";

export default async function Page() {
  const [properties, users] = await Promise.all([getProperties(), getUsers()]);

  return <CreateTaskFormModal properties={properties} users={users} />;
}
