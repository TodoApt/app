import { getUser } from "@/app/lib/data";
import { notFound } from "next/navigation";
import UpdateUserFormModal from "@/components/users/edit-user-modal";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const user = await getUser(id);

  if (!user) {
    return notFound();
  }

  return <UpdateUserFormModal user={user} />;
}
