import { auth } from "@/auth";
import UpdateProfileFormModal from "@/components/profile/edit-profile";
import { User } from "@/app/lib/schema";

export default async function Page() {
  const session = await auth();

  return <UpdateProfileFormModal user={session?.user as User} />;
}
