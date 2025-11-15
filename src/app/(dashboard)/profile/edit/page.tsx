import { auth } from "@/auth";
import UpdateProfileForm from "@/components/profile/edit-profile";
import { User } from "@/app/lib/schema";

export default async function Page() {
  const session = await auth();

  return <UpdateProfileForm user={session?.user as User} />;
}
