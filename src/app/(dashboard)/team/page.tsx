import { Metadata } from "next";
import { headers } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Team from "@/components/team/team";
import { getTeam, getTeamUsage } from "@/app/lib/data";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Team");
  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    title: `${t("title")} | ${brandConfig.name}`,
  };
}

export default async function Page() {
  const t = await getTranslations();

  const session = await auth();

  const [team, usage] = await Promise.all([
    getTeam(session?.user.teamId as string),
    getTeamUsage(),
  ]);

  if (!team) {
    notFound();
  }

  return (
    <div>
      <div className={"flex items-center justify-between"}>
        <h2 className="text-base font-medium text-gray-700 dark:text-gray-300">
          {t("Team.yourTeam")}
        </h2>

        <Link href={"/team/edit"}>
          <Button>{t("Shared.edit")}</Button>
        </Link>
      </div>

      <Team team={team} usage={usage} />
    </div>
  );
}
