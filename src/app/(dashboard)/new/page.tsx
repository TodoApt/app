import CreateTaskForm from "@/components/tasks/create-task";
import { getProperties, getUsers } from "@/app/lib/data";

export default async function Page() {
  const [properties, users] = await Promise.all([getProperties(), getUsers()]);

  return <CreateTaskForm properties={properties} users={users} />;
}
