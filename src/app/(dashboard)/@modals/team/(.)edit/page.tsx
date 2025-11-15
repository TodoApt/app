import { getTeam } from "@/app/lib/data";
import { notFound } from "next/navigation";
import UpdateTeamForm from "@/components/team/edit-team";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const team = await getTeam(session?.user.teamId as string);

  if (!team) {
    return notFound();
  }

  return <UpdateTeamForm team={team} />;
}
